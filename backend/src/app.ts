import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { searchEbayItems } from "./utils/ebay";
import type { SearchItem } from "@shared/types";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    // 1. Extract the whitelist from the env string
    const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",");

    // 2. Safely capture the incoming request origin (API Gateway handles casing unpredictably)
    const requestOrigin = event.headers.origin || event.headers.Origin || "";

    // 3. Dynamic Origin Reflection: Mirror if whitelisted (or if * allows all), otherwise fallback to first allowed
    const corsOrigin = allowedOrigins.includes("*")
        ? "*"
        : allowedOrigins.includes(requestOrigin)
          ? requestOrigin
          : allowedOrigins[0] || "";

    const headers = {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
    };

    if (event.resource === "/search" && event.httpMethod === "GET") {
        const query = (event.queryStringParameters?.query ?? "")
            .trim()
            .toLowerCase();

        const appId = process.env.EBAY_APP_ID || process.env.EBAY_CLIENT_ID;
        const certId =
            process.env.EBAY_CERT_ID || process.env.EBAY_CLIENT_SECRET;

        // Fallback to mock data if eBay credentials are not configured
        if (!appId || !certId) {
            console.warn(
                "eBay credentials not configured. Falling back to mock data.",
            );

            const mockDb: SearchItem[] = [
                {
                    itemId: "mock-1",
                    title: "Vintage Leather Jacket - Classic Style",
                    price: "85.00",
                    currency: "USD",
                    condition: "Pre-owned",
                    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&fit=crop&q=80",
                    itemWebUrl: "https://www.ebay.com/itm/mock-1",
                },
                {
                    itemId: "mock-2",
                    title: "Apple iPhone 13 - 128GB - Unlocked",
                    price: "420.00",
                    currency: "USD",
                    condition: "Pre-owned",
                    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&fit=crop&q=80",
                    itemWebUrl: "https://www.ebay.com/itm/mock-2",
                },
                {
                    itemId: "mock-3",
                    title: "Retro Mechanical Keyboard (RGB)",
                    price: "65.50",
                    currency: "USD",
                    condition: "New",
                    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&fit=crop&q=80",
                    itemWebUrl: "https://www.ebay.com/itm/mock-3",
                },
                {
                    itemId: "mock-4",
                    title: "Sony WH-1000XM4 Noise Canceling Headphones",
                    price: "180.00",
                    currency: "USD",
                    condition: "Refurbished",
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&fit=crop&q=80",
                    itemWebUrl: "https://www.ebay.com/itm/mock-4",
                },
                {
                    itemId: "mock-5",
                    title: "Leather Suede Hiking Boots - Size 10",
                    price: "72.00",
                    currency: "USD",
                    condition: "Pre-owned",
                    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=200&fit=crop&q=80",
                    itemWebUrl: "https://www.ebay.com/itm/mock-5",
                },
            ];

            let filteredResults = mockDb.filter((item) =>
                item.title.toLowerCase().includes(query),
            );

            if (filteredResults.length === 0 && query.length > 0) {
                filteredResults = [
                    {
                        itemId: "dynamic-mock",
                        title: `Discover: ${
                            query.charAt(0).toUpperCase() + query.slice(1)
                        } (Mock Product)`,
                        price: "49.99",
                        currency: "USD",
                        condition: "Pre-owned",
                        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&fit=crop&q=80",
                        itemWebUrl: "https://www.ebay.com/itm/dynamic-mock",
                    },
                ];
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    results: filteredResults,
                }),
            };
        }

        // Fetch real search results from eBay API
        try {
            const results = await searchEbayItems(query);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    results,
                }),
            };
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to query eBay API";
            console.error("eBay search retrieval failed:", error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: "Internal Server Error",
                    message: errorMessage,
                }),
            };
        }
    }

    return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
            error: "Not Found",
            message: "Endpoint not found",
        }),
    };
};
