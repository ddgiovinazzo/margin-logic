import {
    InputGrid,
    InputRow,
    SectionLabel,
    InputWrapper,
    Label,
    Input,
    PrimaryButton,
} from "../styles/Library";
import type { PlatformSettings } from "../hooks/useMarginCalculator";

interface SourcingFormProps {
    settings: PlatformSettings;
    marketPrice: number | "";
    onSettingsUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPriceUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: (e: React.FormEvent) => void;
}

export function SourcingForm({
    settings,
    marketPrice,
    onSettingsUpdate,
    onPriceUpdate,
    onCalculate,
}: SourcingFormProps) {
    return (
        <InputGrid onSubmit={onCalculate}>
            <SectionLabel>Market Target</SectionLabel>
            <InputWrapper>
                <Label htmlFor="marketPrice">Average Sold Price ($)</Label>
                <Input
                    id="marketPrice"
                    name="marketPrice"
                    type="number"
                    value={marketPrice}
                    onChange={onPriceUpdate}
                    placeholder="e.g. 50.00"
                    required
                />
            </InputWrapper>

            <SectionLabel>Logistics & Tax (Persistent)</SectionLabel>
            <InputRow>
                <InputWrapper>
                    <Label htmlFor="handlingFee">Shipping ($)</Label>
                    <Input
                        id="handlingFee"
                        name="handlingFee"
                        type="number"
                        value={settings.handlingFee}
                        onChange={onSettingsUpdate}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="taxRate">Sales Tax %</Label>
                    <Input
                        id="taxRate"
                        name="taxRate"
                        type="number"
                        value={settings.taxRate}
                        onChange={onSettingsUpdate}
                    />
                </InputWrapper>
            </InputRow>

            <SectionLabel>Platform Fees</SectionLabel>
            <InputRow>
                <InputWrapper>
                    <Label htmlFor="fvfRate">FVF %</Label>
                    <Input
                        id="fvfRate"
                        name="fvfRate"
                        type="number"
                        value={settings.fvfRate}
                        onChange={onSettingsUpdate}
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
                    />
                </InputWrapper>
            </InputRow>

            <PrimaryButton type="submit">FIND MAX BUY PRICE</PrimaryButton>
        </InputGrid>
    );
}
