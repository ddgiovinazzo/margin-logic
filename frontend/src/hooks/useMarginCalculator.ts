import { useState, useEffect, useMemo } from "react";
import type { CalculationInputs } from "@shared/types";
import { fetchBreakEven } from "../services/api";
import { ROCKLAND_DEFAULTS } from "../config/defaults";
import { useDebounce } from "./useDebounce";
import { calculateSourcingHealth, ProfitStatus } from "../utils/sourcing";

export type UIFormState = Record<keyof CalculationInputs, number | "">;

export function useMarginCalculator() {
    const [inputs, setInputs] = useState<UIFormState>(ROCKLAND_DEFAULTS);
    const [marketPrice, setMarketPrice] = useState<number | "">("");
    const [breakEven, setBreakEven] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedInputs = useDebounce(inputs, 300);

    const analysis = useMemo(() => {
        if (isLoading || marketPrice === "") {
            return {
                status: "neutral" as ProfitStatus,
                profit: 0,
                margin: 0,
                label: isLoading
                    ? "Calculating..."
                    : "Enter market price to analyze",
            };
        }
        return calculateSourcingHealth(marketPrice, breakEven);
    }, [marketPrice, breakEven, isLoading]);

    useEffect(() => {
        if (!debouncedInputs.itemCost || debouncedInputs.itemCost <= 0) {
            setBreakEven(0);
            return;
        }

        const getCalculation = async () => {
            setIsLoading(true);
            try {
                const safePayload: CalculationInputs = {
                    itemCost: Number(debouncedInputs.itemCost) || 0,
                    handlingFee: Number(debouncedInputs.handlingFee) || 0,
                    fixedFee: Number(debouncedInputs.fixedFee) || 0,
                    fvfRate: Number(debouncedInputs.fvfRate) || 0,
                    adRate: Number(debouncedInputs.adRate) || 0,
                    taxRate: Number(debouncedInputs.taxRate) || 0,
                };
                const result = await fetchBreakEven(safePayload);
                setBreakEven(result.breakEven);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getCalculation();
    }, [debouncedInputs]);

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (value === "") setInputs((prev) => ({ ...prev, [name]: 0 }));
    };

    const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarketPrice(e.target.value === "" ? "" : parseFloat(e.target.value));
    };

    const resetForm = () => {
        setInputs(ROCKLAND_DEFAULTS);
        setMarketPrice("");
    };

    return {
        inputs,
        marketPrice,
        breakEven,
        isLoading,
        analysis,
        handleUpdate,
        handleBlur,
        handlePriceUpdate,
        resetForm,
    };
}
