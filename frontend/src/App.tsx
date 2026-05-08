import { useState, useEffect, useMemo } from "react";
import type { CalculationInputs } from "@shared/types";
import { fetchBreakEven } from "./services/api";
import { ROCKLAND_DEFAULTS } from "./config/defaults";
import { useDebounce } from "./hooks/useDebounce";
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
    SrOnly, // Added for accessibility
} from "./styles/Library";
import { calculateSourcingHealth, ProfitStatus } from "./utils/sourcing";

function App() {
    const [inputs, setInputs] = useState<CalculationInputs>(ROCKLAND_DEFAULTS);
    const [breakEven, setBreakEven] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedInputs = useDebounce(inputs, 300);

    const analysis = useMemo(() => {
        if (isLoading) {
            return {
                status: "neutral" as ProfitStatus,
                profit: 0,
                margin: 0,
                label: "Calculating margin...",
            };
        }

        return calculateSourcingHealth(inputs.marketPrice, breakEven);
    }, [inputs.marketPrice, breakEven, isLoading]);

    useEffect(() => {
        if (!debouncedInputs.itemCost || debouncedInputs.itemCost <= 0) {
            setBreakEven(0);
            return;
        }

        const getCalculation = async () => {
            setIsLoading(true);
            try {
                const result = await fetchBreakEven(debouncedInputs);
                setBreakEven(result.breakEven);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getCalculation();
    }, [debouncedInputs]);

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    return (
        <>
            <GlobalStyle />
            <Container as="main" style={{ opacity: isLoading ? 0.7 : 1 }}>
                <header>
                    <Title>MarginLogic</Title>
                    <HelpText style={{ textAlign: "center" }}>
                        Live Sourcing Analysis
                    </HelpText>
                </header>

                <ResultCard
                    as="section"
                    $status={analysis.status}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <Label as="h2">Break-Even Price</Label>
                    <PriceDisplay>
                        <SrOnly>The break-even price is </SrOnly>
                        {isLoading ? "..." : `$${breakEven.toFixed(2)}`}
                    </PriceDisplay>

                    <div
                        style={{
                            marginTop: "16px",
                            borderTop: "1px solid rgba(0,0,0,0.1)",
                            paddingTop: "16px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <div>
                                <Label>Est. Profit</Label>
                                <div
                                    style={{
                                        fontSize: "1.4rem",
                                        fontWeight: "900",
                                    }}
                                >
                                    ${analysis.profit.toFixed(2)}
                                </div>
                            </div>
                            <div>
                                <Label>Margin</Label>
                                <div
                                    style={{
                                        fontSize: "1.4rem",
                                        fontWeight: "900",
                                    }}
                                >
                                    {analysis.margin.toFixed(1)}%
                                </div>
                            </div>
                        </div>
                        <HelpText
                            style={{
                                marginTop: "12px",
                                fontWeight: "600",
                                color: "inherit",
                                fontSize: "0.95rem",
                            }}
                        >
                            {analysis.label}
                        </HelpText>
                    </div>
                </ResultCard>

                <InputGrid as="form">
                    <SectionLabel>Sourcing Data</SectionLabel>
                    {[
                        {
                            label: "Item Cost ($)",
                            name: "itemCost",
                            step: "0.01",
                        },
                        {
                            label: "Avg. Sold Price ($)",
                            name: "marketPrice",
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
                            <Label htmlFor={field.name}>{field.label}</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="number"
                                step={field.step}
                                value={
                                    inputs[
                                        field.name as keyof CalculationInputs
                                    ] ?? ""
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
                            <Label htmlFor={field.name}>{field.label}</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="number"
                                step={field.step}
                                value={
                                    inputs[
                                        field.name as keyof CalculationInputs
                                    ] ?? ""
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
