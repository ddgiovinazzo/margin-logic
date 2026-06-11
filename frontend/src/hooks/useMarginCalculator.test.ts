import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMarginCalculator } from "./useMarginCalculator";

describe("useMarginCalculator Hook", () => {
    beforeEach(() => {
        // Clear localStorage and reset all mock handlers
        localStorage.clear();
        vi.clearAllMocks();
    });

    it("should initialize with default settings and empty states", () => {
        const { result } = renderHook(() => useMarginCalculator());

        expect(result.current.settings).toEqual({
            taxRate: 10,
            fvfRate: 15,
            adRate: 2.0,
            fixedFee: 0.3,
            shippingRate: 0,
        });
        expect(result.current.marketPrice).toBe("");
        expect(result.current.isModalOpen).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.analysis.label).toBe("Enter Market Price");
    });

    it("should update market price on handlePriceUpdate", () => {
        const { result } = renderHook(() => useMarginCalculator());

        act(() => {
            result.current.handlePriceUpdate({
                target: { value: "150" },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.marketPrice).toBe(150);
    });

    it("should calculate correct price tiers and open modal on calculatePrice", () => {
        const { result } = renderHook(() => useMarginCalculator());

        act(() => {
            result.current.calculatePrice(100);
        });

        // Math checking for target market price $100:
        // settings: taxRate=10%, fvfRate=15%, adRate=2%, fixedFee=0.3
        // feeLoad = (0.15 + 0.02) * (1 + 0.10) = 0.17 * 1.10 = 0.187 (18.7%)
        // Excellent Tier (30% Profit Target):
        // profit = 100 * 0.3 = 30
        // netPool = 100 * (1 - 0.187) - 0 - 0.3 - 30 = 81.3 - 0.3 - 30 = 51.0
        // netAfterFixedHandling = 51.0 - 1.5 = 49.5
        // maxBuy = 49.5 / 1.01 = 49.0099... -> ~49.01
        expect(result.current.isModalOpen).toBe(true);
        expect(result.current.analysis.tiers.excellent.profit).toBe(30);
        expect(result.current.analysis.tiers.excellent.maxBuy).toBeCloseTo(
            49.01,
            2,
        );

        // Break-Even Tier (0% Profit Target):
        // profit = 0
        // netPool = 100 * (1 - 0.187) - 0 - 0.3 - 0 = 81.0
        // netAfterFixedHandling = 81.0 - 1.5 = 79.5
        // maxBuy = 79.5 / 1.01 = 78.7128... -> ~78.71
        expect(result.current.analysis.tiers.breakEven.profit).toBe(0);
        expect(result.current.analysis.tiers.breakEven.maxBuy).toBeCloseTo(
            78.71,
            2,
        );
    });

    it("should update settings and save to localStorage", () => {
        const { result } = renderHook(() => useMarginCalculator());

        act(() => {
            result.current.handleSettingsUpdate({
                target: { name: "taxRate", value: "8" },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.settings.taxRate).toBe("8");
        expect(localStorage.getItem("marginlogic_settings")).toContain(
            '"taxRate":"8"',
        );
    });

    it("should reset input and close modal on resetForm", () => {
        const { result } = renderHook(() => useMarginCalculator());

        act(() => {
            result.current.handlePriceUpdate({
                target: { value: "100" },
            } as React.ChangeEvent<HTMLInputElement>);
            result.current.calculatePrice(100);
        });

        expect(result.current.marketPrice).toBe(100);
        expect(result.current.isModalOpen).toBe(true);

        act(() => {
            result.current.resetForm();
        });

        expect(result.current.marketPrice).toBe("");
        expect(result.current.isModalOpen).toBe(false);
    });
});
