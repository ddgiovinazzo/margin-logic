import {
    GlobalStyle,
    Container,
    AppHeader,
    Title,
    ErrorBanner,
    ModalOverlay,
    PrimaryButton,
    GhostButton,
} from "./styles/Library";
import { useMarginCalculator } from "./hooks/useMarginCalculator";
import { ResultDisplay } from "./components/ResultDisplay";
import { SourcingForm } from "./components/SourcingForm";

function App() {
    const {
        sourcing,
        settings,
        marketPrice,
        breakEven,
        isLoading,
        analysis,
        isModalOpen,
        closeModal,
        handleSourcingUpdate,
        handleSettingsUpdate,
        handleCalculate,
        handlePriceUpdate,
        resetForm,
        error,
    } = useMarginCalculator();

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppHeader>
                    <Title>MarginLogic</Title>
                    <GhostButton
                        onClick={resetForm}
                        style={{ width: "auto", padding: "0.5rem" }}
                    >
                        Reset
                    </GhostButton>
                </AppHeader>

                {error && <ErrorBanner>{error}</ErrorBanner>}

                {/* 🛠️ Explicitly pass the variables here */}
                <SourcingForm
                    sourcing={sourcing}
                    settings={settings}
                    marketPrice={marketPrice}
                    isLoading={isLoading}
                    onSourcingUpdate={handleSourcingUpdate}
                    onSettingsUpdate={handleSettingsUpdate}
                    onPriceUpdate={handlePriceUpdate}
                    onCalculate={handleCalculate}
                    onReset={resetForm}
                />

                {isModalOpen && (
                    <ModalOverlay onClick={closeModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <ResultDisplay
                                status={analysis.status}
                                breakEven={breakEven}
                                profit={analysis.profit}
                                margin={analysis.margin}
                                label={analysis.label}
                            />
                            <PrimaryButton
                                onClick={closeModal}
                                style={{ marginTop: "1rem" }}
                            >
                                Scan Next Item
                            </PrimaryButton>
                        </div>
                    </ModalOverlay>
                )}
            </Container>
        </>
    );
}

export default App;
