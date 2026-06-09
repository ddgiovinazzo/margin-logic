import styled from "styled-components";
import { DESIGN_PALETTE } from "../../utils/colors";
import { PrimaryButton, PrimaryInput, BaseCard, SubHeading } from "../CoreUI";

interface CalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    marketPrice: number;
    settings: {
        taxRate: number | "";
        fvfRate: number | "";
        adRate: number | "";
        fixedFee: number | "";
        shippingRate: number | "";
    };
    analysis: {
        tiers: {
            excellent: { maxBuy: number; profit: number };
            healthy: { maxBuy: number; profit: number };
            thin: { maxBuy: number; profit: number };
            breakEven: { maxBuy: number; profit: number };
        };
        label: string;
    };
    onSettingsUpdate: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    onRecalculate: (price: number) => void;
}

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
`;

const ModalBox = styled.div`
    background: ${DESIGN_PALETTE.SURFACE_CARD};
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    border-radius: 12px;
    width: 100%;
    max-width: 460px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

const ModalHeader = styled.div`
    padding: 1.25rem;
    border-bottom: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const ProductTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    margin: 0;
    line-height: 1.4;
`;

const PriceTag = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.PRIMARY_BRAND};
    white-space: nowrap;
    margin-top: 0.25rem;
`;

const ModalBody = styled.div`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-height: 70vh;
    overflow-y: auto;
`;

const SettingsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    background: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
`;

const FormLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 600;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const MiniatureInput = styled(PrimaryInput)`
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 4px;
`;

const ResultsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const SectionTitle = styled(SubHeading)`
    margin: 0 0 0.25rem 0;
`;

interface TierCardProps {
    borderColor: string;
    bgColor: string;
}

const TierCard = styled(BaseCard)<TierCardProps>`
    border-left: 4px solid ${(props) => props.borderColor};
    background: ${(props) => props.bgColor};
    border-radius: 6px;
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL}1A;
    border-right: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL}1A;
    border-bottom: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL}1A;
    box-shadow: none;
`;

const TierName = styled.div`
    font-size: 0.9rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
`;

const TargetProfit = styled.div`
    font-size: 0.75rem;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    margin-top: 0.15rem;
`;

const MaxBuyLabel = styled.div`
    font-size: 0.7rem;
    font-weight: 600;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    text-transform: uppercase;
    text-align: right;
`;

const MaxBuyValue = styled.div`
    font-size: 1.15rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    text-align: right;
`;

const ModalFooter = styled.div`
    padding: 1rem 1.25rem;
    border-top: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;

export function CalculatorModal({
    isOpen,
    onClose,
    title,
    marketPrice,
    settings,
    analysis,
    onSettingsUpdate,
    onRecalculate,
}: CalculatorModalProps) {
    if (!isOpen) return null;

    // Trigger update logic locally
    const handleLocalSettingsChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        onSettingsUpdate(e);
        // Timeout to let setSettings update, then run recalculation
        setTimeout(() => {
            onRecalculate(marketPrice);
        }, 0);
    };

    return (
        <Backdrop onClick={onClose} role="dialog" aria-modal="true">
            <ModalBox onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <div>
                        <ProductTitle>{title}</ProductTitle>
                        <PriceTag>${marketPrice.toFixed(2)}</PriceTag>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <div>
                        <SectionTitle>Calculation Parameters</SectionTitle>
                        <SettingsGrid>
                            <FormGroup>
                                <FormLabel htmlFor="fvfRate">
                                    Final Value %
                                </FormLabel>
                                <MiniatureInput
                                    id="fvfRate"
                                    type="number"
                                    name="fvfRate"
                                    value={settings.fvfRate}
                                    onChange={handleLocalSettingsChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="adRate">Ad Fee %</FormLabel>
                                <MiniatureInput
                                    id="adRate"
                                    type="number"
                                    name="adRate"
                                    value={settings.adRate}
                                    onChange={handleLocalSettingsChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="taxRate">
                                    Sales Tax %
                                </FormLabel>
                                <MiniatureInput
                                    id="taxRate"
                                    type="number"
                                    name="taxRate"
                                    value={settings.taxRate}
                                    onChange={handleLocalSettingsChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="shippingRate">
                                    USPS Rate $
                                </FormLabel>
                                <MiniatureInput
                                    id="shippingRate"
                                    type="number"
                                    name="shippingRate"
                                    value={settings.shippingRate}
                                    onChange={handleLocalSettingsChange}
                                />
                            </FormGroup>
                        </SettingsGrid>
                    </div>

                    <div>
                        <SectionTitle>
                            Maximum Sourcing Target Prices
                        </SectionTitle>
                        <ResultsGrid>
                            <TierCard
                                borderColor={DESIGN_PALETTE.SIGNAL_SUCCESS}
                                bgColor="rgba(40, 167, 69, 0.05)"
                            >
                                <div>
                                    <TierName>Excellent (30% Margin)</TierName>
                                    <TargetProfit>
                                        Target profit: $
                                        {analysis.tiers.excellent.profit.toFixed(
                                            2,
                                        )}
                                    </TargetProfit>
                                </div>
                                <div>
                                    <MaxBuyLabel>Max Buy Price</MaxBuyLabel>
                                    <MaxBuyValue>
                                        $
                                        {analysis.tiers.excellent.maxBuy.toFixed(
                                            2,
                                        )}
                                    </MaxBuyValue>
                                </div>
                            </TierCard>

                            <TierCard
                                borderColor="#007bff"
                                bgColor="rgba(0, 123, 255, 0.05)"
                            >
                                <div>
                                    <TierName>Healthy (20% Margin)</TierName>
                                    <TargetProfit>
                                        Target profit: $
                                        {analysis.tiers.healthy.profit.toFixed(
                                            2,
                                        )}
                                    </TargetProfit>
                                </div>
                                <div>
                                    <MaxBuyLabel>Max Buy Price</MaxBuyLabel>
                                    <MaxBuyValue>
                                        $
                                        {analysis.tiers.healthy.maxBuy.toFixed(
                                            2,
                                        )}
                                    </MaxBuyValue>
                                </div>
                            </TierCard>

                            <TierCard
                                borderColor="#ffc107"
                                bgColor="rgba(255, 193, 7, 0.05)"
                            >
                                <div>
                                    <TierName>Thin (10% Margin)</TierName>
                                    <TargetProfit>
                                        Target profit: $
                                        {analysis.tiers.thin.profit.toFixed(2)}
                                    </TargetProfit>
                                </div>
                                <div>
                                    <MaxBuyLabel>Max Buy Price</MaxBuyLabel>
                                    <MaxBuyValue>
                                        ${analysis.tiers.thin.maxBuy.toFixed(2)}
                                    </MaxBuyValue>
                                </div>
                            </TierCard>

                            <TierCard
                                borderColor="#6c757d"
                                bgColor="rgba(108, 117, 125, 0.05)"
                            >
                                <div>
                                    <TierName>Break Even (0% Margin)</TierName>
                                    <TargetProfit>
                                        No profit margin built in
                                    </TargetProfit>
                                </div>
                                <div>
                                    <MaxBuyLabel>Max Buy Price</MaxBuyLabel>
                                    <MaxBuyValue>
                                        $
                                        {analysis.tiers.breakEven.maxBuy.toFixed(
                                            2,
                                        )}
                                    </MaxBuyValue>
                                </div>
                            </TierCard>
                        </ResultsGrid>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <PrimaryButton onClick={onClose}>
                        Close Analysis
                    </PrimaryButton>
                </ModalFooter>
            </ModalBox>
        </Backdrop>
    );
}
