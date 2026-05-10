import {
    GlobalStyle,
    Container,
    AppHeader,
    Title,
    HelpText,
} from "./styles/Library";
import { useMarginCalculator } from "./hooks/useMarginCalculator";
import { ResultDisplay } from "./components/ResultDisplay";
import { SourcingForm } from "./components/SourcingForm";

function App() {
    const {
        inputs,
        marketPrice,
        breakEven,
        isLoading,
        analysis,
        handleUpdate,
        handleCalculate,
        handlePriceUpdate,
        resetForm,
        error,
    } = useMarginCalculator();
    return (
        <>
            <GlobalStyle />
            <Container style={{ opacity: isLoading ? 0.7 : 1 }}>
                <AppHeader>
                    <Title>MarginLogic</Title>
                    <HelpText>Live Sourcing Analysis</HelpText>
                </AppHeader>

                <ResultDisplay
                    status={analysis.status}
                    isLoading={isLoading}
                    breakEven={breakEven}
                    profit={analysis.profit}
                    margin={analysis.margin}
                    label={analysis.label}
                    error={error}
                />

                <SourcingForm
                    inputs={inputs}
                    marketPrice={marketPrice}
                    isLoading={isLoading}
                    onUpdate={handleUpdate}
                    onPriceUpdate={handlePriceUpdate}
                    onCalculate={handleCalculate}
                    onReset={resetForm}
                />
            </Container>
        </>
    );
}

export default App;
