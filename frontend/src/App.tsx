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
        settings,
        marketPrice,
        error,
        analysis,
        isModalOpen,
        closeModal,
        handleSettingsUpdate,
        handleCalculate,
        handlePriceUpdate,
        resetForm,
    } = useMarginCalculator();

    return (
        <>
            <GlobalStyle />
            <Container>
                <AppHeader>
                    <Title>MarginLogic</Title>
                    <GhostButton onClick={resetForm} style={{ width: "auto" }}>
                        Reset
                    </GhostButton>
                </AppHeader>

                {error && <ErrorBanner>{error}</ErrorBanner>}

                <SourcingForm
                    settings={settings}
                    marketPrice={marketPrice}
                    onSettingsUpdate={handleSettingsUpdate}
                    onPriceUpdate={handlePriceUpdate}
                    onCalculate={handleCalculate}
                />

                {isModalOpen && (
                    <ModalOverlay onClick={closeModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <ResultDisplay
                                tiers={analysis.tiers}
                                settings={settings}
                                label={analysis.label}
                            />
                            <PrimaryButton
                                onClick={closeModal}
                                style={{ marginTop: "1rem" }}
                            >
                                Done
                            </PrimaryButton>
                        </div>
                    </ModalOverlay>
                )}
            </Container>
        </>
    );
}

export default App;
