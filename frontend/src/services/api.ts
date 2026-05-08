import { CalculationInputs } from "@shared/types";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

export const fetchBreakEven = async (
    inputs: CalculationInputs,
): Promise<number> => {
    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        return parseFloat(data.breakEvenPrice) || 0;
    } catch (error) {
        console.error("MarginLogic API Error:", error);
        return 0;
    }
};
