import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface PlatformSettings {
    taxRate: number | "";
    fvfRate: number | "";
    adRate: number | "";
    fixedFee: number | "";
    shippingRate: number | "";
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
    taxRate: 10,
    fvfRate: 15,
    adRate: 2.0,
    fixedFee: 0.3,
    shippingRate: 0,
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

    const calculatePrice = (price: number) => {
        const P = Number(price);
        if (P <= 0 || isNaN(P)) return;

        // --- INTERNAL MATH ENGINE ---
        const F = Number(settings.fvfRate) / 100;
        const A = Number(settings.adRate) / 100;
        const T = Number(settings.taxRate) / 100;

        // S = The raw USPS Commercial rate from the dropdown preset
        const S = Number(settings.shippingRate) || 0;
        const FF = Number(settings.fixedFee) || 0;

        const feeLoad = (F + A) * (1 + T);

        const getTierData = (targetMarginPct: number): TierResult => {
            const profitDollars = P * (targetMarginPct / 100);

            // 1. Calculate the remaining pool of money before the Item Cost (C)
            // and the fixed $1.50 portion of the handling formula.
            const netPool = P * (1 - feeLoad) - S - FF - profitDollars;

            // 2. Subtract the $1.50 fixed baseline
            const netAfterFixedHandling = netPool - 1.5;

            // 3. Isolate C by dividing out the 1% multiplier (1.01)
            const maxBuy = netAfterFixedHandling / 1.01;

            return {
                maxBuy: Math.max(0, maxBuy),
                profit: profitDollars,
            };
        };

        setAnalysis({
            tiers: {
                excellent: getTierData(30),
                healthy: getTierData(20),
                thin: getTierData(10),
                breakEven: getTierData(0),
            },
            label: `Analysis for $${P.toFixed(2)} Target`,
        });

        setMarketPrice(P);
        setIsModalOpen(true);
    };

    const handleCalculate = (e: React.SyntheticEvent) => {
        e.preventDefault();
        calculatePrice(Number(marketPrice));
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
        calculatePrice,
        handleSettingsUpdate,
        handlePriceUpdate,
        handleCalculate,
        closeModal: () => setIsModalOpen(false),
        resetForm,
        isLoading: false,
    };
}
