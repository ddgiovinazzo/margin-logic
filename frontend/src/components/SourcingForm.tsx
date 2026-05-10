import type { CalculationInputs } from "@shared/types";
import { UIFormState } from "../hooks/useMarginCalculator";
import {
    InputGrid,
    SectionLabel,
    InputWrapper,
    Label,
    Input,
    GhostButton,
} from "../styles/Library";
import { colors } from "../styles/colors";

interface SourcingFormProps {
    inputs: UIFormState;
    marketPrice: number | "";
    onUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onPriceUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
}

export function SourcingForm({
    inputs,
    marketPrice,
    onUpdate,
    onBlur,
    onPriceUpdate,
    onReset,
}: SourcingFormProps) {
    return (
        <>
            <InputGrid onSubmit={(e) => e.preventDefault()}>
                <SectionLabel>Market Analysis</SectionLabel>
                <InputWrapper>
                    <Label htmlFor="marketPrice">Avg. Sold Price ($)</Label>
                    <Input
                        id="marketPrice"
                        name="marketPrice"
                        type="number"
                        step="0.01"
                        value={marketPrice ?? ""}
                        onChange={onPriceUpdate}
                        style={{
                            borderColor:
                                marketPrice === "" ? "inherit" : colors.primary,
                            backgroundColor:
                                marketPrice === ""
                                    ? "inherit"
                                    : colors.background,
                        }}
                    />
                </InputWrapper>

                <SectionLabel>Sourcing Data</SectionLabel>
                {[
                    { label: "Item Cost ($)", name: "itemCost", step: "0.01" },
                    {
                        label: "Handling/Shipping ($)",
                        name: "handlingFee",
                        step: "0.01",
                    },
                    { label: "Sales Tax (%)", name: "taxRate", step: "0.1" },
                ].map((field) => (
                    <InputWrapper key={field.name}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            step={field.step}
                            value={
                                inputs[field.name as keyof CalculationInputs] ??
                                ""
                            }
                            onChange={onUpdate}
                            onBlur={onBlur}
                        />
                    </InputWrapper>
                ))}

                <SectionLabel>Platform Fees</SectionLabel>
                {[
                    { label: "eBay Ad Rate (%)", name: "adRate", step: "0.1" },
                    { label: "eBay FVF (%)", name: "fvfRate", step: "0.01" },
                    { label: "Fixed Fee ($)", name: "fixedFee", step: "0.01" },
                ].map((field) => (
                    <InputWrapper key={field.name}>
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            step={field.step}
                            value={
                                inputs[field.name as keyof CalculationInputs] ??
                                ""
                            }
                            onChange={onUpdate}
                            onBlur={onBlur}
                        />
                    </InputWrapper>
                ))}
            </InputGrid>

            <GhostButton type="button" onClick={onReset}>
                Reset All Fields
            </GhostButton>
        </>
    );
}
