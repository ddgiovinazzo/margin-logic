import { CalculationInputs } from "./types";

export const calculateBreakEven = (data: CalculationInputs): string => {
    const { itemCost, handlingFee, ebayFixedFee } = data;

    const F = data.finalValueFeeRate / 100;
    const A = data.adFeeRate / 100;
    const T = data.salesTaxRate / 100;

    const numerator = itemCost + handlingFee + ebayFixedFee;
    const denominator = 1 - (F + A) * (1 + T);

    if (denominator <= 0) {
        return "Error: Invalid Rates";
    }

    const breakEvenPrice = numerator / denominator;
    return breakEvenPrice.toFixed(2);
};
