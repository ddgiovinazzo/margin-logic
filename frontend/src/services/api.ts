import { CalculationInputs } from "@shared/types";

export interface CalculationResponse {
    breakEven: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export const fetchBreakEven = async (
    inputs: CalculationInputs,
): Promise<CalculationResponse> => {
    const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
    });

    if (!response.ok) {
        throw new Error(
            `Backend error: ${response.status} ${response.statusText}`,
        );
    }

    const data = (await response.json()) as CalculationResponse;

    return {
        breakEven: data.breakEven || 0,
    };
};
