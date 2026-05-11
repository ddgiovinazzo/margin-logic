import React from "react";
import {
    Input,
    InputGrid,
    InputRow,
    InputWrapper,
    Label,
    PrimaryButton,
    SectionLabel,
} from "./CoreUI";
import type { PlatformSettings } from "../hooks/useMarginCalculator";

interface SourcingFormProps {
    settings: PlatformSettings;
    marketPrice: number | "";
    onSettingsUpdate: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    onPriceUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: (e: React.SyntheticEvent) => void;
}

const SHIPPING_PRESETS = [
    { label: "None / Custom", value: 0 },
    { label: "Padded Env ($11.99)", value: 11.99 },
    { label: "Small Box ($12.10)", value: 12.1 },
    { label: "Medium Box ($21.17)", value: 21.17 },
    { label: "Large Box ($31.00)", value: 31.0 },
];

export function SourcingForm({
    settings,
    marketPrice,
    onSettingsUpdate,
    onPriceUpdate,
    onCalculate,
}: SourcingFormProps) {
    return (
        <form onSubmit={onCalculate}>
            <InputGrid>
                {/* SECTION 1: Revenue & Logistics */}
                <SectionLabel>Market & Shipping</SectionLabel>

                <InputWrapper>
                    <Label htmlFor="marketPrice">Average Sold Price ($)</Label>
                    <Input
                        id="marketPrice"
                        type="number"
                        value={marketPrice}
                        onChange={onPriceUpdate}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        autoFocus
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label htmlFor="shippingRate">Shipping Preset</Label>
                    <select
                        id="shippingRate"
                        name="shippingRate"
                        value={settings.shippingRate}
                        onChange={onSettingsUpdate}
                        style={{
                            width: "100%",
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "1px solid #CCC",
                            fontSize: "1rem",
                            backgroundColor: "#F9FAFB",
                        }}
                    >
                        {SHIPPING_PRESETS.map((p) => (
                            <option key={p.label} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </InputWrapper>

                {/* SECTION 2: Platform & Government Overhead */}
                <SectionLabel style={{ marginTop: "1rem" }}>
                    Fees & Tax
                </SectionLabel>

                {/* Row 1: The eBay Percentages */}
                <InputRow>
                    <InputWrapper>
                        <Label htmlFor="fvfRate">FVF %</Label>
                        <Input
                            id="fvfRate"
                            name="fvfRate"
                            type="number"
                            value={settings.fvfRate}
                            onChange={onSettingsUpdate}
                            step="0.01"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="adRate">Ads %</Label>
                        <Input
                            id="adRate"
                            name="adRate"
                            type="number"
                            value={settings.adRate}
                            onChange={onSettingsUpdate}
                            step="0.1"
                        />
                    </InputWrapper>
                </InputRow>

                {/* Row 2: Sales Tax & Fixed Fee */}
                <InputRow>
                    <InputWrapper>
                        <Label htmlFor="taxRate">Sales Tax %</Label>
                        <Input
                            id="taxRate"
                            name="taxRate"
                            type="number"
                            value={settings.taxRate}
                            onChange={onSettingsUpdate}
                            step="0.001"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Label htmlFor="fixedFee">Fixed Fee ($)</Label>
                        <Input
                            id="fixedFee"
                            name="fixedFee"
                            type="number"
                            value={settings.fixedFee}
                            onChange={onSettingsUpdate}
                            step="0.01"
                        />
                    </InputWrapper>
                </InputRow>
            </InputGrid>

            <PrimaryButton type="submit">FIND MAX BUY PRICE</PrimaryButton>
        </form>
    );
}
