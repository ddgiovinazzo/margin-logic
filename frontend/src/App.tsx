import { useState, useEffect } from "react";
import type { CalculationInputs } from "@shared/types";
import {
    GlobalStyle,
    Container,
    Title,
    InputGrid,
    InputWrapper,
    Label,
    Input,
    ResultCard,
    PriceDisplay,
    HelpText,
    GhostButton,
    SectionLabel,
} from "./components/Library";

const ROCKLAND_DEFAULTS: CalculationInputs = {
    itemCost: 0,
    handlingFee: 0,
    fixedFee: 0.3,
    fvfRate: 13.25,
    adRate: 2.0,
    taxRate: 8.375,
};

function App() {
    const [inputs, setInputs] = useState<CalculationInputs>(ROCKLAND_DEFAULTS);
    const [breakEven, setBreakEven] = useState<number>(0);

    useEffect(() => {
        const { itemCost, handlingFee, fixedFee, fvfRate, adRate, taxRate } =
            inputs;
        const F = fvfRate / 100;
        const A = adRate / 100;
        const T = taxRate / 100;

        const denominator = 1 - (F + A) * (1 + T);

        if (denominator > 0 && itemCost > 0) {
            const price = (itemCost + handlingFee + fixedFee) / denominator;
            setBreakEven(price);
        } else {
            setBreakEven(0);
        }
    }, [inputs]);

    const resetForm = () => setInputs(ROCKLAND_DEFAULTS);

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>MarginLogic</Title>
                <HelpText>Live Sourcing Analysis</HelpText>

                <ResultCard
                    $isPositive={
                        breakEven > inputs.itemCost * 1.3 && inputs.itemCost > 0
                    }
                >
                    <Label>Break-Even Price</Label>
                    <PriceDisplay>${breakEven.toFixed(2)}</PriceDisplay>
                    <HelpText>Includes fees and local sales tax.</HelpText>
                </ResultCard>

                <InputGrid>
                    {/* GROUP 1: FIELD SOURCING DATA */}
                    <SectionLabel>Sourcing Data</SectionLabel>

                    <InputWrapper>
                        <Label>Item Cost ($)</Label>
                        <Input
                            name="itemCost"
                            type="number"
                            step="0.01"
                            value={inputs.itemCost || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Label>Handling/Shipping ($)</Label>
                        <Input
                            name="handlingFee"
                            type="number"
                            step="0.01"
                            value={inputs.handlingFee || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Label>Sales Tax (%)</Label>
                        <Input
                            name="taxRate"
                            type="number"
                            value={inputs.taxRate || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>

                    {/* GROUP 2: PLATFORM METADATA (API TARGETS) */}
                    <SectionLabel>Platform Fees</SectionLabel>

                    <InputWrapper>
                        <Label>eBay Ad Rate (%)</Label>
                        <Input
                            name="adRate"
                            type="number"
                            value={inputs.adRate || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Label>eBay FVF (%)</Label>
                        <Input
                            name="fvfRate"
                            type="number"
                            value={inputs.fvfRate || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <Label>Fixed Fee ($)</Label>
                        <Input
                            name="fixedFee"
                            type="number"
                            step="0.01"
                            value={inputs.fixedFee || ""}
                            onChange={handleUpdate}
                        />
                    </InputWrapper>
                </InputGrid>

                <GhostButton onClick={resetForm}>Reset All Fields</GhostButton>
            </Container>
        </>
    );
}

export default App;
