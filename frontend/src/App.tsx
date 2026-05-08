import { useState, useEffect } from "react";
import type { CalculationInputs } from "@shared/types";
import { fetchBreakEven } from "./services/api";
import { ROCKLAND_DEFAULTS } from "./config/defaults";
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

function App() {
    const [inputs, setInputs] = useState<CalculationInputs>(ROCKLAND_DEFAULTS);
    const [breakEven, setBreakEven] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (inputs.itemCost === 0) {
            setBreakEven(0);
            return;
        }

        const getCalculation = async () => {
            setIsLoading(true);
            const result = await fetchBreakEven(inputs);
            setBreakEven(result);
            setIsLoading(false);
        };

        getCalculation();
    }, [inputs]);

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
            <Container
                style={{
                    opacity: isLoading ? 0.7 : 1,
                    transition: "opacity 0.2s",
                }}
            >
                <Title>MarginLogic</Title>
                <HelpText>Live Sourcing Analysis</HelpText>

                <ResultCard
                    $isPositive={
                        breakEven > inputs.itemCost * 1.3 && inputs.itemCost > 0
                    }
                >
                    <Label>Break-Even Price</Label>
                    <PriceDisplay>
                        {isLoading
                            ? "Calculating..."
                            : `$${breakEven.toFixed(2)}`}
                    </PriceDisplay>
                    <HelpText>Includes fees and local sales tax.</HelpText>
                </ResultCard>

                <InputGrid>
                    <SectionLabel>Sourcing Data</SectionLabel>
                    {[
                        {
                            label: "Item Cost ($)",
                            name: "itemCost",
                            step: "0.01",
                        },
                        {
                            label: "Handling/Shipping ($)",
                            name: "handlingFee",
                            step: "0.01",
                        },
                        {
                            label: "Sales Tax (%)",
                            name: "taxRate",
                            step: "0.1",
                        },
                    ].map((field) => (
                        <InputWrapper key={field.name}>
                            <Label>{field.label}</Label>
                            <Input
                                name={field.name}
                                type="number"
                                step={field.step}
                                value={
                                    inputs[
                                        field.name as keyof CalculationInputs
                                    ] || ""
                                }
                                onChange={handleUpdate}
                            />
                        </InputWrapper>
                    ))}

                    <SectionLabel>Platform Fees</SectionLabel>
                    {[
                        {
                            label: "eBay Ad Rate (%)",
                            name: "adRate",
                            step: "0.1",
                        },
                        {
                            label: "eBay FVF (%)",
                            name: "fvfRate",
                            step: "0.01",
                        },
                        {
                            label: "Fixed Fee ($)",
                            name: "fixedFee",
                            step: "0.01",
                        },
                    ].map((field) => (
                        <InputWrapper key={field.name}>
                            <Label>{field.label}</Label>
                            <Input
                                name={field.name}
                                type="number"
                                step={field.step}
                                value={
                                    inputs[
                                        field.name as keyof CalculationInputs
                                    ] || ""
                                }
                                onChange={handleUpdate}
                            />
                        </InputWrapper>
                    ))}
                </InputGrid>

                <GhostButton onClick={() => setInputs(ROCKLAND_DEFAULTS)}>
                    Reset All Fields
                </GhostButton>
            </Container>
        </>
    );
}

export default App;
