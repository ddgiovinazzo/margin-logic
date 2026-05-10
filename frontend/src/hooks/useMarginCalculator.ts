import { useState, useRef } from "react";
import type { CalculationInputs } from "@shared/types";
import { fetchBreakEven } from "../services/api";
import { calculateSourcingHealth, ProfitStatus } from "../utils/sourcing";
import { useLocalStorage } from "./useLocalStorage";

interface AnalysisState {
    status: ProfitStatus;
    profit: number | "-";
    margin: number | "-";
    label: string;
}

export interface PlatformSettings {
    taxRate: number | "";
    fvfRate: number | "";
    adRate: number | "";
    fixedFee: number | "";
}

export interface SourcingData {
    itemCost: number | "";
    handlingFee: number | "";
}

const DEFAULT_SETTINGS: PlatformSettings = {
    taxRate: 8.375,
    fvfRate: 13.25,
    adRate: 2.0,
    fixedFee: 0.3,
};

export function useMarginCalculator() {
    const [settings, setSettings] = useLocalStorage<PlatformSettings>(
        "marginlogic_settings",
        DEFAULT_SETTINGS,
    );

    const [sourcing, setSourcing] = useState<SourcingData>({
        itemCost: "",
        handlingFee: "",
    });
    const [marketPrice, setMarketPrice] = useState<number | "">("");

    const [breakEven, setBreakEven] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [analysis, setAnalysis] = useState<AnalysisState>({
        status: "neutral" as ProfitStatus,
        profit: "-",
        margin: "-",
        label: "Enter data and press Calculate",
    });

    const lastApiPayload = useRef<string | null>(null);

    const handleCalculate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);

        if (!sourcing.itemCost || sourcing.itemCost <= 0) {
            setError("Please enter an Item Cost to continue.");
            return;
        }

        const safePayload: CalculationInputs = {
            itemCost: Number(sourcing.itemCost) || 0,
            handlingFee: Number(sourcing.handlingFee) || 0,
            fixedFee: Number(settings.fixedFee) || 0,
            fvfRate: Number(settings.fvfRate) || 0,
            adRate: Number(settings.adRate) || 0,
            taxRate: Number(settings.taxRate) || 0,
        };

        const payloadKey = JSON.stringify(safePayload);

        if (payloadKey !== lastApiPayload.current) {
            setIsLoading(true);

            try {
                const result = await fetchBreakEven(safePayload);
                setBreakEven(result.breakEven);
                lastApiPayload.current = payloadKey;

                // ✨ FIX 2: Use the raw marketPrice for the dash logic
                setAnalysis(
                    calculateSourcingHealth(marketPrice, result.breakEven),
                );
                setIsModalOpen(true);
            } catch (err) {
                console.error("API Error:", err);
                setError(
                    "Connection error. Please check your signal and try again.",
                );
            } finally {
                setIsLoading(false);
            }
        } else {
            // ✨ FIX 3: Use 'breakEven' state here, because 'result' is not in scope
            setAnalysis(calculateSourcingHealth(marketPrice, breakEven));
            setIsModalOpen(true);
        }
    };

    const handleSourcingUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSourcing((prev) => ({
            ...prev,
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    const handleSettingsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarketPrice(e.target.value === "" ? "" : parseFloat(e.target.value));
    };

    const closeModal = () => setIsModalOpen(false);

    const resetForm = () => {
        setSourcing({ itemCost: "", handlingFee: "" });
        setMarketPrice("");
        setBreakEven(0);
        // ✨ FIX 4: Update reset values to match the new string-friendly state
        setAnalysis({
            status: "neutral",
            profit: "-",
            margin: "-",
            label: "Enter data and press Calculate",
        });
        setError(null);
        lastApiPayload.current = null;
        setIsModalOpen(false);
    };

    return {
        sourcing,
        settings,
        marketPrice,
        breakEven,
        isLoading,
        error,
        analysis,
        isModalOpen,
        handleSourcingUpdate,
        handleSettingsUpdate,
        handlePriceUpdate,
        handleCalculate,
        closeModal,
        resetForm,
    };
}
