import { describe, it, after, beforeEach } from "node:test";
import assert from "node:assert";
import { lambdaHandler } from "./app";
import { APIGatewayProxyEvent } from "aws-lambda";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;

describe("app - lambdaHandler", () => {
    beforeEach(() => {
        // Clear env vars before each test to guarantee control
        process.env = { ...originalEnv };
        process.env.ALLOWED_ORIGIN =
            "http://localhost:5173,https://ddgiovinazzo.github.io";
        process.env.EBAY_APP_ID = "test-app-id";
        process.env.EBAY_CERT_ID = "test-cert-id";
        process.env.EBAY_ENVIRONMENT = "sandbox";
    });

    after(() => {
        globalThis.fetch = originalFetch;
        process.env = originalEnv;
    });

    const createMockEvent = (
        method: string,
        resource: string,
        originHeader = "http://localhost:5173",
        queryParams: Record<string, string> | null = null,
    ): APIGatewayProxyEvent => {
        return {
            resource,
            path: resource,
            httpMethod: method,
            headers: {
                origin: originHeader,
                Origin: originHeader,
            },
            multiValueHeaders: {},
            queryStringParameters: queryParams,
            multiValueQueryStringParameters: null,
            pathParameters: null,
            stageVariables: null,
            requestContext: {} as APIGatewayProxyEvent["requestContext"],
            body: null,
            isBase64Encoded: false,
        };
    };

    const setupMockEbayEndpoints = () => {
        globalThis.fetch = (async (
            url: RequestInfo | URL,
            _options?: RequestInit,
        ) => {
            const urlStr = url.toString();

            if (urlStr.includes("/identity/v1/oauth2/token")) {
                return {
                    ok: true,
                    status: 200,
                    text: async () =>
                        JSON.stringify({
                            access_token: "mock-oauth-token",
                            expires_in: 7200,
                        }),
                    json: async () => ({
                        access_token: "mock-oauth-token",
                        expires_in: 7200,
                    }),
                } as unknown as Response;
            }

            if (urlStr.includes("/buy/browse/v1/item_summary/search")) {
                return {
                    ok: true,
                    status: 200,
                    text: async () =>
                        JSON.stringify({
                            itemSummaries: [
                                {
                                    itemId: "real-ebay-1",
                                    title: "Real eBay Item",
                                    price: { value: "99.99", currency: "USD" },
                                    image: {
                                        imageUrl: "https://example.com/img.jpg",
                                    },
                                    itemWebUrl: "https://ebay.com/real-1",
                                    condition: "New",
                                },
                            ],
                        }),
                    json: async () => ({
                        itemSummaries: [
                            {
                                itemId: "real-ebay-1",
                                title: "Real eBay Item",
                                price: { value: "99.99", currency: "USD" },
                                image: {
                                    imageUrl: "https://example.com/img.jpg",
                                },
                                itemWebUrl: "https://ebay.com/real-1",
                                condition: "New",
                            },
                        ],
                    }),
                } as unknown as Response;
            }

            return {
                ok: false,
                status: 404,
                text: async () => "Not Found",
            } as unknown as Response;
        }) as unknown as typeof globalThis.fetch;
    };

    it("should fallback to mock data when eBay credentials are not configured", async () => {
        // Remove credentials to trigger fallback logic
        delete process.env.EBAY_APP_ID;
        delete process.env.EBAY_CERT_ID;

        const event = createMockEvent(
            "GET",
            "/search",
            "http://localhost:5173",
            {
                query: "leather",
            },
        );
        const response = await lambdaHandler(event);

        assert.strictEqual(response.statusCode, 200);
        const body = JSON.parse(response.body);
        assert.ok(body.results);
        assert.strictEqual(body.results.length, 2);
        assert.strictEqual(body.results[0].itemId, "mock-1");
    });

    it("should successfully search real items from eBay API when credentials are present", async () => {
        setupMockEbayEndpoints();

        const event = createMockEvent(
            "GET",
            "/search",
            "http://localhost:5173",
            {
                query: "iphone",
            },
        );
        const response = await lambdaHandler(event);

        assert.strictEqual(response.statusCode, 200);
        const body = JSON.parse(response.body);
        assert.ok(body.results);
        assert.strictEqual(body.results.length, 1);
        assert.strictEqual(body.results[0].itemId, "real-ebay-1");
        assert.strictEqual(body.results[0].title, "Real eBay Item");
    });

    it("should dynamically reflect whitelisted CORS origins", async () => {
        setupMockEbayEndpoints();

        // 1. Check whitelisted origin
        const event1 = createMockEvent(
            "GET",
            "/search",
            "https://ddgiovinazzo.github.io",
            { query: "iphone" },
        );
        const response1 = await lambdaHandler(event1);
        assert.strictEqual(
            response1.headers?.["Access-Control-Allow-Origin"],
            "https://ddgiovinazzo.github.io",
        );

        // 2. Check non-whitelisted origin (should fallback to first allowed origin)
        const event2 = createMockEvent(
            "GET",
            "/search",
            "https://malicious.domain.com",
            { query: "iphone" },
        );
        const response2 = await lambdaHandler(event2);
        assert.strictEqual(
            response2.headers?.["Access-Control-Allow-Origin"],
            "http://localhost:5173",
        );
    });

    it("should return 404 for unknown endpoints", async () => {
        const event = createMockEvent("GET", "/invalid-path");
        const response = await lambdaHandler(event);

        assert.strictEqual(response.statusCode, 404);
        const body = JSON.parse(response.body);
        assert.strictEqual(body.error, "Not Found");
    });
});
