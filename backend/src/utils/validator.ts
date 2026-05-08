import { CalculationInputs } from "@shared/types";

export const validateInputs = (data: unknown): CalculationInputs => {
    const requiredFields: (keyof CalculationInputs)[] = [
        "itemCost",
        "handlingFee",
        "taxRate",
        "fvfRate",
        "adRate",
        "fixedFee",
    ];

    if (typeof data !== "object" || data === null) {
        throw new Error("Invalid request body: Expected an object.");
    }

    const inputRecord = data as Record<string, unknown>;

    for (const field of requiredFields) {
        const value = inputRecord[field];

        if (typeof value !== "number" || isNaN(value)) {
            throw new Error(
                `Invalid or missing field: ${field}. Expected a valid number.`,
            );
        }
    }

    return data as CalculationInputs;
};
