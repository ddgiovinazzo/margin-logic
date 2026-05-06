import { APIGatewayProxyEvent } from "aws-lambda";
import { lambdaHandler } from "./app";

const mockEvent: Partial<APIGatewayProxyEvent> = {
    body: JSON.stringify({
        itemCost: 50.0,
        handlingFee: 2.0,
        ebayFixedFee: 0.3,
        finalValueFeeRate: 0.1325,
        adFeeRate: 0.02,
        salesTaxRate: 0.08875
    }),
    httpMethod: "POST",
    path: "/calculate",
    headers: {
        "Content-Type": "application/json"
    }
};

console.log("🚀 Starting local test of MarginLogic...");

lambdaHandler(mockEvent as APIGatewayProxyEvent)
    .then(res => {
        const parsedBody = JSON.parse(res.body);
        console.log("✅ Status Code:", res.statusCode);
        console.log("💰 Calculated Break-Even Price:", parsedBody.breakEvenPrice);
    })
    .catch(err => {
        console.error("❌ Test Failed:", err);
    });
