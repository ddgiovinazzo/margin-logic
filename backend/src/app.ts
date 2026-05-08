import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CalculationInputs } from "@shared/types";
import { calculateBreakEven } from "./calculator";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const incomingOrigin =
        event.headers.Origin || event.headers.origin || "Unknown";
    console.log(`[DEBUG] Method: ${event.httpMethod}`);
    console.log(`[DEBUG] Browser sent Origin: ${incomingOrigin}`);
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: HEADERS, body: "" };
    }

    try {
        const body = JSON.parse(event.body || "{}") as CalculationInputs;

        console.log(`Calculating for: ${body.itemCost} @ ${body.taxRate}% tax`);

        const result = calculateBreakEven(body);

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ breakEvenPrice: result }),
        };
    } catch (error) {
        console.error("Calculation Error:", error);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
