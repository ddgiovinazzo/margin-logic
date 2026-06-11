import { describe, it } from "node:test";
import assert from "node:assert";
import { calculateBreakEven } from "./calculator";

describe("calculator - calculateBreakEven", () => {
    it("should correctly calculate the break-even price", () => {
        const result = calculateBreakEven({
            itemCost: 10,
            handlingFee: 2,
            fixedFee: 0.3,
            fvfRate: 10, // 10%
            adRate: 5, // 5%
            taxRate: 8, // 8%
        });
        // Math breakdown:
        // F = 0.1, A = 0.05, T = 0.08
        // Numerator = 10 + 2 + 0.3 = 12.3
        // Denominator = 1 - (0.1 + 0.05) * (1 + 0.08) = 1 - 0.15 * 1.08 = 1 - 0.162 = 0.838
        // Break-even price = 12.3 / 0.838 = 14.6778... -> 14.68
        assert.strictEqual(result, "14.68");
    });

    it("should return error for invalid rates resulting in zero or negative denominator", () => {
        const result = calculateBreakEven({
            itemCost: 10,
            handlingFee: 2,
            fixedFee: 0.3,
            fvfRate: 50,
            adRate: 50,
            taxRate: 10,
        });
        assert.strictEqual(result, "Error: Invalid Rates");
    });
});
