import { useState, useRef } from "react";
import type { CalculationInputs } from "@shared/types";
import { fetchBreakEven } from "../services/api";
import { ROCKLAND_DEFAULTS } from "../config/defaults";
import { calculateSourcingHealth, ProfitStatus } from "../utils/sourcing";

export type UIFormState = Record<keyof CalculationInputs, number | "">;

export function useMarginCalculator() {
    const [inputs, setInputs] = useState<UIFormState>(ROCKLAND_DEFAULTS);
    const [marketPrice, setMarketPrice] = useState<number | "">("");

    const [breakEven, setBreakEven] = useState<number>(0);
    const [analysis, setAnalysis] = useState({
        status: "neutral" as ProfitStatus,
        profit: 0,
        margin: 0,
        label: "Enter data and press Calculate",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const lastApiPayload = useRef<string | null>(null);

    const handleCalculate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        // Basic validation
        if (!inputs.itemCost || inputs.itemCost <= 0) {
            setBreakEven(0);
            setAnalysis({
                status: "neutral",
                profit: 0,
                margin: 0,
                label: "Item cost required",
            });
            return;
        }

        const safePayload: CalculationInputs = {
            itemCost: Number(inputs.itemCost) || 0,
            handlingFee: Number(inputs.handlingFee) || 0,
            fixedFee: Number(inputs.fixedFee) || 0,
            fvfRate: Number(inputs.fvfRate) || 0,
            adRate: Number(inputs.adRate) || 0,
            taxRate: Number(inputs.taxRate) || 0,
        };

        // Convert the payload to a string so we can easily compare it to our cache
        const payloadKey = JSON.stringify(safePayload);

        // 1. Did the sourcing variables actually change?
        if (payloadKey !== lastApiPayload.current) {
            setIsLoading(true);
            setError(null);

            try {
                const result = await fetchBreakEven(safePayload);
                setBreakEven(result.breakEven);

                // Save this successful string to the cache!
                lastApiPayload.current = payloadKey;

                if (marketPrice === "") {
                    setAnalysis({
                        status: "neutral",
                        profit: 0,
                        margin: 0,
                        label: "Enter market price to analyze",
                    });
                } else {
                    setAnalysis(
                        calculateSourcingHealth(marketPrice, result.breakEven),
                    );
                }
            } catch (err) {
                console.error("API Error:", err);
                setError(
                    "Network error: Unable to calculate break-even. Please check your connection.",
                );
            } finally {
                setIsLoading(false);
            }
        } else {
            // 2. THE CACHE HIT!
            // The sourcing variables are identical. Only the marketPrice changed.
            // Skip the API completely and just run the local math!
            if (marketPrice === "") {
                setAnalysis({
                    status: "neutral",
                    profit: 0,
                    margin: 0,
                    label: "Enter market price to analyze",
                });
            } else {
                setAnalysis(calculateSourcingHealth(marketPrice, breakEven));
            }
        }
    };

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarketPrice(e.target.value === "" ? "" : parseFloat(e.target.value));
    };

    const resetForm = () => {
        setInputs(ROCKLAND_DEFAULTS);
        setMarketPrice("");
        setBreakEven(0);
        setAnalysis({
            status: "neutral",
            profit: 0,
            margin: 0,
            label: "Enter data and press Calculate",
        });
        setError(null);
        // ✨ Clear the cache when resetting the form
        lastApiPayload.current = null;
    };

    return {
        inputs,
        marketPrice,
        breakEven,
        isLoading,
        error,
        analysis,
        handleUpdate,
        handlePriceUpdate,
        handleCalculate,
        resetForm,
    };
}
