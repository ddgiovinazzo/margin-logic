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
    onSettingsUpdate: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    onPriceUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculate: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

const SHIPPING_PRESETS = [
    { label: "None", value: 0 },
    { label: "Padded Env ($15.50)", value: 15.5 },
    { label: "Small Box ($15.15)", value: 15.15 },
    { label: "Medium Box ($27.80)", value: 27.8 },
    { label: "Large Box ($40.00)", value: 40.0 },
];

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
                    min="0.01"
                    step="0.01"
                    required
                />
            </InputWrapper>

            <SectionLabel>Logistics & Tax</SectionLabel>
            <InputRow>
                <InputWrapper>
                    <Label htmlFor="handlingFee">Shipping Preset</Label>
                    <select
                        id="handlingFee"
                        name="handlingFee"
                        value={settings.handlingFee}
                        onChange={onSettingsUpdate}
                        style={{
                            padding: "0.8rem",
                            borderRadius: "8px",
                            border: "1px solid #CCC",
                            fontSize: "1rem",
                        }}
                    >
                        {SHIPPING_PRESETS.map((p) => (
                            <option key={p.label} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </InputWrapper>
                <InputWrapper>
                    <Label htmlFor="taxRate">Sales Tax %</Label>
                    <Input
                        id="taxRate"
                        name="taxRate"
                        type="number"
                        value={settings.taxRate}
                        onChange={onSettingsUpdate}
                        min="0"
                        max="100"
                        step="0.001"
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
                        step="0.01"
                    />
                </InputWrapper>
                {/* Added Fixed Fee Back 👇 */}
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

            <PrimaryButton type="submit">FIND MAX BUY PRICE</PrimaryButton>
        </InputGrid>
    );
}
