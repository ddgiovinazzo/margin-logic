import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface PlatformSettings {
    taxRate: number | "";
    fvfRate: number | "";
    adRate: number | "";
    fixedFee: number | "";
    handlingFee: number | "";
}

// Each tier now tracks the Buy Limit AND the Reward
interface TierResult {
    maxBuy: number;
    profit: number;
}

interface PriceTiers {
    excellent: TierResult;
    healthy: TierResult;
    thin: TierResult;
    breakEven: TierResult;
}

interface AnalysisState {
    tiers: PriceTiers;
    label: string;
}

const DEFAULT_SETTINGS: PlatformSettings = {
    taxRate: 8.375, // Rockland County baseline
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

    // Initial state updated to match TierResult structure
    const [analysis, setAnalysis] = useState<AnalysisState>({
        tiers: {
            excellent: { maxBuy: 0, profit: 0 },
            healthy: { maxBuy: 0, profit: 0 },
            thin: { maxBuy: 0, profit: 0 },
            breakEven: { maxBuy: 0, profit: 0 },
        },
        label: "Enter Market Price",
    });

    const handleCalculate = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const P = Number(marketPrice);
        if (P <= 0) return;

        // --- INTERNAL MATH ENGINE ---
        // We cast to Number here to handle values coming from the <select> or <input>
        const F = Number(settings.fvfRate) / 100;
        const A = Number(settings.adRate) / 100;
        const T = Number(settings.taxRate) / 100;
        const H = Number(settings.handlingFee) || 0;
        const FF = Number(settings.fixedFee) || 0;

        // The formula: P = (C + H + Fixed Fee) / (1 - (F+A) * (1+T))
        // Re-calculated to isolate C (Cost):
        const feeLoad = (F + A) * (1 + T);

        const getTierData = (targetMarginPct: number): TierResult => {
            const profitDollars = P * (targetMarginPct / 100);
            const maxBuy = P * (1 - feeLoad) - H - FF - profitDollars;

            return {
                maxBuy: maxBuy, // REMOVE the > 0 check so negative values pass through
                profit: profitDollars,
            };
        };

        setAnalysis({
            tiers: {
                excellent: getTierData(30), // 30% Net Margin
                healthy: getTierData(20), // 20% Net Margin
                thin: getTierData(10), // 10% Net Margin
                breakEven: getTierData(0), // 0% (The Floor)
            },
            label: `Analysis for $${P.toFixed(2)} Target`,
        });

        setIsModalOpen(true);
    };

    const handleSettingsUpdate = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: value,
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
        isLoading: false,
    };
}
