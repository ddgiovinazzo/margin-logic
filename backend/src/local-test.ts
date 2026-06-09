import { lambdaHandler } from "./app";
import { APIGatewayProxyEvent } from "aws-lambda";

async function runTests() {
    console.log("Running local Lambda API tests...\n");

    const mockEvent = (query: string): Partial<APIGatewayProxyEvent> => ({
        resource: "/search",
        httpMethod: "GET",
        queryStringParameters: { query },
        headers: {},
        multiValueHeaders: {},
        path: "/search",
        pathParameters: null,
        stageVariables: null,
        requestContext: {} as unknown as APIGatewayProxyEvent["requestContext"],
        body: null,
        isBase64Encoded: false,
    });

    // Test case 1: Query matching "leather" (expecting 2 results)
    console.log("Test Case 1: Query for 'leather' (expecting 2 results)...");
    const result1 = await lambdaHandler(
        mockEvent("leather") as APIGatewayProxyEvent,
    );
    console.log("Status Code:", result1.statusCode);
    console.log("Response Body:", result1.body);
    const body1 = JSON.parse(result1.body);
    if (
        result1.statusCode !== 200 ||
        !body1.results ||
        body1.results.length !== 2
    ) {
        throw new Error("Test Case 1 Failed!");
    }
    console.log("Test Case 1 Passed.\n");

    // Test case 2: Query matching "iphone" (expecting 1 result)
    console.log("Test Case 2: Query for 'iphone' (expecting 1 result)...");
    const result2 = await lambdaHandler(
        mockEvent("iphone") as APIGatewayProxyEvent,
    );
    console.log("Status Code:", result2.statusCode);
    console.log("Response Body:", result2.body);
    const body2 = JSON.parse(result2.body);
    if (
        result2.statusCode !== 200 ||
        !body2.results ||
        body2.results.length !== 1 ||
        body2.results[0].itemId !== "mock-2"
    ) {
        throw new Error("Test Case 2 Failed!");
    }
    console.log("Test Case 2 Passed.\n");

    // Test case 3: Query for 'xyz' (expecting dynamic mock product fallback)
    console.log(
        "Test Case 3: Query for 'xyz' (expecting 1 dynamic fallback result)...",
    );
    const result3 = await lambdaHandler(
        mockEvent("xyz") as APIGatewayProxyEvent,
    );
    console.log("Status Code:", result3.statusCode);
    console.log("Response Body:", result3.body);
    const body3 = JSON.parse(result3.body);
    if (
        result3.statusCode !== 200 ||
        !body3.results ||
        body3.results.length !== 1 ||
        body3.results[0].itemId !== "dynamic-mock"
    ) {
        throw new Error("Test Case 3 Failed!");
    }
    console.log("Test Case 3 Passed.\n");

    // Test case 4: Non-existent endpoint
    console.log("Test Case 4: Query invalid endpoint...");
    const result4 = await lambdaHandler({
        ...mockEvent(""),
        resource: "/invalid",
    } as APIGatewayProxyEvent);
    console.log("Status Code:", result4.statusCode);
    console.log("Response Body:", result4.body);
    if (result4.statusCode !== 404) {
        throw new Error("Test Case 4 Failed!");
    }
    console.log("Test Case 4 Passed.\n");

    console.log("All backend local tests passed successfully! 🎉");
}

runTests().catch((err) => {
    console.error("Test execution failed:", err);
    process.exit(1);
});
