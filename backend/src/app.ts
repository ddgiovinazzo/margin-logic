import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CalculationInputs } from "./types";
import { calculateBreakEven } from "./calculator";

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body || "{}") as CalculationInputs;
        const result = calculateBreakEven(body);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application.json",
                "Access=Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST: OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ breakEvenPrice: result })
        };
    } catch(error){
        console.error("Calculation Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" })
        };

    }

};
