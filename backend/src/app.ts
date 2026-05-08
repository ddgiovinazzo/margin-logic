import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateInputs } from "./utils/validator";

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: "Bad Request",
                    message: "Missing request body",
                }),
            };
        }

        const rawData: unknown = JSON.parse(event.body);
        const validatedInputs = validateInputs(rawData);

        // 4. Domain Logic: Execute the Formula
        // P = (C + H + Fixed Fee) / (1 - (F+A) * (1+T))
        const { itemCost, handlingFee, taxRate, fvfRate, adRate, fixedFee } =
            validatedInputs;

        const combinedFees = fvfRate / 100 + adRate / 100;
        const taxMultiplier = 1 + taxRate / 100;
        const denominator = 1 - combinedFees * taxMultiplier;

        if (denominator <= 0) {
            throw new Error(
                "Fee structure exceeds 100% of value. Check rates.",
            );
        }

        console.log("Inputs received:", validatedInputs);
        const breakEven = (itemCost + handlingFee + fixedFee) / denominator;
        console.log("Calculated Break Even:", breakEven);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                breakEven: parseFloat(breakEven.toFixed(2)),
            }),
        };
    } catch (error: unknown) {
        const isValidationError =
            error instanceof Error &&
            error.message.includes("Validation Error");
        const message =
            error instanceof Error ? error.message : "Internal Server Error";

        console.error(`[Handler Error]: ${message}`);

        return {
            statusCode: isValidationError ? 422 : 500,
            headers,
            body: JSON.stringify({
                error: isValidationError
                    ? "Validation Failed"
                    : "Calculation Error",
                message,
            }),
        };
    }
};
