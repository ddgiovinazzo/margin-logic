import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface PlatformSettings {
    taxRate: number | "";
    fvfRate: number | "";
    adRate: number | "";
    fixedFee: number | "";
    handlingFee: number | "";
}

interface PriceTiers {
    excellent: number;
    healthy: number;
    thin: number;
    breakEven: number;
}

interface AnalysisState {
    tiers: PriceTiers;
    label: string;
}

const DEFAULT_SETTINGS: PlatformSettings = {
    taxRate: 8.375,
    fvfRate: 13.25,
    adRate: 2.0,
    fixedFee: 0.3,
    handlingFee: 0,
};

export function useMarginCalculator() {
    const [settings, setSettings] = useLocalStorage<PlatformSettings>(
        "marginlogic_settings",
        DEFAULT_SETTINGS,
    );

    const [marketPrice, setMarketPrice] = useState<number | "">("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [analysis, setAnalysis] = useState<AnalysisState>({
        tiers: { excellent: 0, healthy: 0, thin: 0, breakEven: 0 },
        label: "Enter Market Price",
    });

    const handleCalculate = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);

        if (!marketPrice || marketPrice <= 0) {
            setError("Average Sold Price is required.");
            return;
        }

        // --- INTERNAL MATH ENGINE ---
        const P = Number(marketPrice);
        const F = Number(settings.fvfRate) / 100;
        const A = Number(settings.adRate) / 100;
        const T = Number(settings.taxRate) / 100;
        const H = Number(settings.handlingFee) || 0;
        const FF = Number(settings.fixedFee) || 0;

        const feeLoad = (F + A) * (1 + T);

        const getMaxBuy = (targetMargin: number) => {
            const targetProfit = P * (targetMargin / 100);
            return P * (1 - feeLoad) - H - FF - targetProfit;
        };

        setAnalysis({
            tiers: {
                excellent: getMaxBuy(30),
                healthy: getMaxBuy(20),
                thin: getMaxBuy(10),
                breakEven: getMaxBuy(0),
            },
            label: `Max Buy for $${P.toFixed(2)} Target`,
        });

        setIsModalOpen(true);
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

    const resetForm = () => {
        setMarketPrice("");
        setError(null);
        setIsModalOpen(false);
    };

    return {
        settings,
        marketPrice,
        error,
        analysis,
        isModalOpen,
        handleSettingsUpdate,
        handlePriceUpdate,
        handleCalculate,
        closeModal: () => setIsModalOpen(false),
        resetForm,
        isLoading: false, // Hardcoded false as calculation is now instant
    };
}
