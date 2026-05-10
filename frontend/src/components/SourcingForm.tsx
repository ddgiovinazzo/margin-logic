import {
    InputGrid,
    InputRow,
    SectionLabel,
    InputWrapper,
    Label,
    Input,
    PrimaryButton,
} from "../styles/Library";
import { colors } from "../styles/colors";
import type {
    SourcingData,
    PlatformSettings,
} from "../hooks/useMarginCalculator";

interface SourcingFormProps {
    sourcing: SourcingData;
    settings: PlatformSettings;
    marketPrice: number | "";
    isLoading: boolean;
    onSourcingUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSettingsUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPriceUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: (e: React.FormEvent) => void;
    onReset: () => void;
}

export function SourcingForm({
    sourcing,
    settings,
    marketPrice,
    isLoading,
    onSourcingUpdate,
    onSettingsUpdate,
    onPriceUpdate,
    onCalculate,
}: SourcingFormProps) {
    return (
        <InputGrid onSubmit={onCalculate}>
            <SectionLabel>Item & Market</SectionLabel>
            <InputRow>
                <InputWrapper>
                    <Label htmlFor="itemCost">Cost ($)</Label>
                    <Input
                        id="itemCost"
                        name="itemCost"
                        type="number"
                        value={sourcing.itemCost}
                        onChange={onSourcingUpdate}
                        placeholder="0.00"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="marketPrice">Avg Sold ($)</Label>
                    <Input
                        id="marketPrice"
                        name="marketPrice"
                        type="number"
                        value={marketPrice}
                        onChange={onPriceUpdate}
                        placeholder="Optional"
                        style={{
                            border: marketPrice
                                ? `2px solid ${colors.primary}`
                                : "",
                        }}
                    />
                </InputWrapper>
            </InputRow>

            <SectionLabel>Logistics & Taxes</SectionLabel>
            <InputRow>
                <InputWrapper>
                    <Label htmlFor="handlingFee">Shipping ($)</Label>
                    <Input
                        id="handlingFee"
                        name="handlingFee"
                        type="number"
                        value={sourcing.handlingFee}
                        onChange={onSourcingUpdate}
                        placeholder="0"
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="taxRate">Tax (%)</Label>
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
                    <Label htmlFor="fvfRate">FVF (%)</Label>
                    <Input
                        id="fvfRate"
                        name="fvfRate"
                        type="number"
                        value={settings.fvfRate}
                        onChange={onSettingsUpdate}
                    />
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="adRate">Ads (%)</Label>
                    <Input
                        id="adRate"
                        name="adRate"
                        type="number"
                        value={settings.adRate}
                        onChange={onSettingsUpdate}
                    />
                </InputWrapper>
            </InputRow>

            <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? "CALCULATING..." : "CALCULATE MARGIN"}
            </PrimaryButton>
        </InputGrid>
    );
}
