import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const headers = {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
    };

    if (event.resource === "/search" && event.httpMethod === "GET") {
        const query = (event.queryStringParameters?.query ?? "").trim().toLowerCase();
        const testResults = ["Result 1", "Result 2", "Result 3"];
        const filteredResults = testResults.filter((result) =>
            result.toLowerCase().includes(query)
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
