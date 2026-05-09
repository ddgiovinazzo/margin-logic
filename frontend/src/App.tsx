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
    SrOnly,
} from "./styles/Library";
import { calculateSourcingHealth, ProfitStatus } from "./utils/sourcing";
import { colors } from "./styles/colors";

type UIFormState = Record<keyof CalculationInputs, number | "">;

function App() {
    // 1. Backend-Focused State (Strictly Numbers for the Break-Even API)
    const [inputs, setInputs] = useState<UIFormState>(ROCKLAND_DEFAULTS);

    // 2. UI-Focused State (Allows empty string for visual clearance)
    const [marketPrice, setMarketPrice] = useState<number | "">("");

    const [breakEven, setBreakEven] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedInputs = useDebounce(inputs, 300);

    const analysis = useMemo(() => {
        if (isLoading || marketPrice === "") {
            return {
                status: "neutral" as ProfitStatus,
                profit: 0,
                margin: 0,
                label: isLoading
                    ? "Calculating..."
                    : "Enter market price to analyze",
            };
        }
        return calculateSourcingHealth(marketPrice, breakEven);
    }, [marketPrice, breakEven, isLoading]);

    // Fetch new break-even point when core sourcing variables change
    useEffect(() => {
        if (!debouncedInputs.itemCost || debouncedInputs.itemCost <= 0) {
            setBreakEven(0);
            return;
        }

        const getCalculation = async () => {
            setIsLoading(true);
            try {
                // Construct a 100% TS-compliant, zero-safe payload
                const safePayload: CalculationInputs = {
                    itemCost: Number(debouncedInputs.itemCost) || 0,
                    handlingFee: Number(debouncedInputs.handlingFee) || 0,
                    fixedFee: Number(debouncedInputs.fixedFee) || 0,
                    fvfRate: Number(debouncedInputs.fvfRate) || 0,
                    adRate: Number(debouncedInputs.adRate) || 0,
                    taxRate: Number(debouncedInputs.taxRate) || 0,
                };

                const result = await fetchBreakEven(safePayload);
                setBreakEven(result.breakEven);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getCalculation();
    }, [debouncedInputs]);

    // Handler for the Sourcing backend data
    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            // Allow the empty string so the user can backspace!
            [name]: value === "" ? "" : parseFloat(value),
        }));
    };

    // Handler for the Analysis UI
    const handlePriceUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMarketPrice(value === "" ? "" : parseFloat(value));
    };

    return (
        <>
            <GlobalStyle />
            <Container style={{ opacity: isLoading ? 0.7 : 1 }}>
                <header>
                    <Title>MarginLogic</Title>
                    <HelpText style={{ textAlign: "center" }}>
                        Live Sourcing Analysis
                    </HelpText>
                </header>

                <ResultCard
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
                            onChange={handlePriceUpdate}
                            style={{
                                borderColor:
                                    marketPrice === ""
                                        ? "inherit"
                                        : colors.primary,
                                backgroundColor:
                                    marketPrice === ""
                                        ? "inherit"
                                        : colors.background,
                            }}
                        />
                    </InputWrapper>

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

                <GhostButton
                    type="button"
                    onClick={() => {
                        setInputs(ROCKLAND_DEFAULTS);
                        setMarketPrice("");
                    }}
                >
                    Reset All Fields
                </GhostButton>
            </Container>
        </>
    );
}

export default App;
