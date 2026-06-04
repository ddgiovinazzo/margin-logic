import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    // 1. Extract the whitelist from the environment string
    const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",");
    
    // 2. Safely capture the incoming request origin (API Gateway handles casing unpredictably)
    const requestOrigin = event.headers.origin || event.headers.Origin || "";

    // 3. Dynamic Origin Reflection: Mirror if whitelisted (or if * allows all), otherwise fallback to first allowed
    const corsOrigin = allowedOrigins.includes("*")
        ? "*"
        : allowedOrigins.includes(requestOrigin)
        ? requestOrigin
        : (allowedOrigins[0] || "");

    const headers = {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
    };

    if (event.resource === "/search" && event.httpMethod === "GET") {
        const query = (event.queryStringParameters?.query ?? "")
            .trim()
            .toLowerCase();
        const testResults = ["Result 1", "Result 2", "Result 3"];
        const filteredResults = testResults.filter((result) =>
            result.toLowerCase().includes(query),
        );
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                results: filteredResults,
            }),
        };
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