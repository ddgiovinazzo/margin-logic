import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert";
import { getEbayAccessToken } from "./tokenManager";

// Save original environment and globals for test isolation
const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
const originalDateNow = Date.now;

describe("tokenManager - getEbayAccessToken", () => {
    let mockTime = 1000000000000; // Fixed start timestamp: 2001-09-09
    let fetchCallCount = 0;
    let lastFetchOptions: RequestInit | null = null;

    before(() => {
        // Inject mock clock
        globalThis.Date.now = () => mockTime;
    });

    after(() => {
        // Restore original clock and globals
        globalThis.Date.now = originalDateNow;
        globalThis.fetch = originalFetch;
        process.env = originalEnv;
    });

    beforeEach(() => {
        fetchCallCount = 0;
        lastFetchOptions = null;
        // Inject valid environment credentials by default
        process.env.EBAY_APP_ID = "test-app-id";
        process.env.EBAY_CERT_ID = "test-cert-id";
        process.env.EBAY_ENVIRONMENT = "sandbox";
    });

    const setupMockFetch = (
        ok: boolean,
        responseData: Record<string, unknown>,
        status = 200,
    ) => {
        globalThis.fetch = (async (
            url: RequestInfo | URL,
            options?: RequestInit,
        ) => {
            fetchCallCount++;
            lastFetchOptions = options || null;
            return {
                ok,
                status,
                statusText: ok ? "OK" : "Bad Request",
                text: async () => JSON.stringify(responseData),
                json: async () => responseData,
            } as unknown as Response;
        }) as unknown as typeof globalThis.fetch;
    };

    it("should throw an error if EBAY_APP_ID is missing", async () => {
        delete process.env.EBAY_APP_ID;
        await assert.rejects(
            getEbayAccessToken(),
            /Missing required eBay credentials/,
        );
    });

    it("should throw an error if EBAY_CERT_ID is missing", async () => {
        delete process.env.EBAY_CERT_ID;
        await assert.rejects(
            getEbayAccessToken(),
            /Missing required eBay credentials/,
        );
    });

    it("should successfully fetch a token and cache it", async () => {
        setupMockFetch(true, {
            access_token: "mock-token-1",
            expires_in: 7200,
        });

        // 1. First fetch triggers network call (cache miss)
        const token1 = await getEbayAccessToken();
        assert.strictEqual(token1, "mock-token-1");
        assert.strictEqual(fetchCallCount, 1);

        // Verify that the Basic Auth header is base64 encoded client credentials
        const headers = lastFetchOptions?.headers as
            | Record<string, string>
            | undefined;
        const authHeader = headers?.["Authorization"];
        assert.ok(authHeader);
        assert.ok(authHeader.startsWith("Basic "));
        const base64Credentials = authHeader.split(" ")[1];
        const decoded = Buffer.from(base64Credentials, "base64").toString();
        assert.strictEqual(decoded, "test-app-id:test-cert-id");

        // 2. Second fetch retrieves from cache (cache hit)
        const token2 = await getEbayAccessToken();
        assert.strictEqual(token2, "mock-token-1");
        assert.strictEqual(fetchCallCount, 1); // Fetch count stays at 1
    });

    it("should fetch a new token if the cached token is close to expiration", async () => {
        setupMockFetch(true, {
            access_token: "mock-token-2",
            expires_in: 7200,
        });

        // Advance time by 7000 seconds (1 hour 56 mins).
        // The token is cached, but remaining time (200s) is less than the 300s (5 mins) safety buffer.
        // Therefore, it must execute a network refresh.
        mockTime += 7000 * 1000;

        const token = await getEbayAccessToken();
        assert.strictEqual(token, "mock-token-2");
        assert.strictEqual(fetchCallCount, 1);
    });

    it("should propagate error on failed network request", async () => {
        // Advance time significantly to invalidate the cached token from previous tests
        mockTime += 100000 * 1000;
        setupMockFetch(false, { error: "invalid_client" }, 400);

        await assert.rejects(
            getEbayAccessToken(),
            /eBay OAuth request failed with status 400/,
        );
    });
});
