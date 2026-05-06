import { CalculationInputs } from "./types";

export const calculateBreakEven = (data: CalculationInputs): string => {
    const {
        itemCost,
        handlingFee,
        ebayFixedFee,
        finalValueFeeRate,
        adFeeRate,
        salesTaxRate,
    } = data;

    const numerator = itemCost + handlingFee + ebayFixedFee;

    const denominator = 1 - (finalValueFeeRate + adFeeRate) * (1 + salesTaxRate);

    if (denominator <= 0) {
        return "Error: Invalid Rates";
    }

    const breakEvenPrice = numerator / denominator;
    return breakEvenPrice.toFixed(2);

};
