import type { CalculationInputs } from "@shared/types";

export const calculateBreakEven = (data: CalculationInputs): string => {
    const { itemCost, handlingFee, fixedFee } = data;

    const F = data.fvfRate / 100;
    const A = data.adRate / 100;
    const T = data.taxRate / 100;

    const numerator = itemCost + handlingFee + fixedFee;
    const denominator = 1 - (F + A) * (1 + T);

    if (denominator <= 0) {
        return "Error: Invalid Rates";
    }

    const breakEvenPrice = numerator / denominator;
    return breakEvenPrice.toFixed(2);
};
