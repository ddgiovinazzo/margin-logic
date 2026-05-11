import { colors } from "../utils/colors";
import type { PlatformSettings } from "../hooks/useMarginCalculator";
import {
    AuditText,
    DisclaimerText,
    Divider,
    Label,
    MetricValue,
    ProfitText,
    ResultCard,
    ResultHeading,
    TierItem,
    TierValueGroup,
} from "./CoreUI";

interface ResultDisplayProps {
    tiers: {
        excellent: { maxBuy: number; profit: number };
        healthy: { maxBuy: number; profit: number };
        thin: { maxBuy: number; profit: number };
        breakEven: { maxBuy: number; profit: number };
    };
    settings: PlatformSettings;
    label: string;
}

export function ResultDisplay({ tiers, settings, label }: ResultDisplayProps) {
    const isTotalLoss = tiers.breakEven.maxBuy <= 0;
    const baseLossAmount = Math.abs(tiers.breakEven.maxBuy);

    return (
        <ResultCard $status={isTotalLoss ? "critical" : "neutral"}>
            <ResultHeading>{label}</ResultHeading>

            {isTotalLoss ? (
                /* 🚨 UNPROFITABLE STATE */
                <TierItem $isLoss>
                    <Label $color={colors.critical}>Unprofitable Item</Label>
                    <TierValueGroup $alignCenter>
                        <MetricValue $status="critical" $isLarge>
                            DO NOT BUY
                        </MetricValue>
                        <ProfitText $color={colors.critical}>
                            ~${baseLossAmount.toFixed(2)} Est. Loss (If Free)
                        </ProfitText>
                    </TierValueGroup>
                </TierItem>
            ) : (
                /* ✅ PROFITABLE STATE */
                <>
                    <TierItem>
                        <Label $color={colors.critical} $noMargin>
                            Break-Even (0%)
                        </Label>
                        <TierValueGroup>
                            <MetricValue $status="critical">
                                ~${tiers.breakEven.maxBuy.toFixed(2)}
                            </MetricValue>
                            <ProfitText $color={colors.critical}>
                                ~$0.00 Est. Profit
                            </ProfitText>
                        </TierValueGroup>
                    </TierItem>

                    {tiers.thin.maxBuy > 0 && (
                        <TierItem>
                            <Label $noMargin>Standard (10%)</Label>
                            <TierValueGroup>
                                <MetricValue $status="neutral">
                                    ~${tiers.thin.maxBuy.toFixed(2)}
                                </MetricValue>
                                <ProfitText $color={colors.textSecondary}>
                                    ~${tiers.thin.profit.toFixed(2)} Est. Profit
                                </ProfitText>
                            </TierValueGroup>
                        </TierItem>
                    )}

                    {tiers.healthy.maxBuy > 0 && (
                        <TierItem>
                            <Label $color={colors.warning} $noMargin>
                                Healthy (20%)
                            </Label>
                            <TierValueGroup>
                                <MetricValue $status="warning">
                                    ~${tiers.healthy.maxBuy.toFixed(2)}
                                </MetricValue>
                                <ProfitText $color={colors.warning}>
                                    ~${tiers.healthy.profit.toFixed(2)} Est.
                                    Profit
                                </ProfitText>
                            </TierValueGroup>
                        </TierItem>
                    )}

                    {tiers.excellent.maxBuy > 0 && (
                        <TierItem>
                            <Label $color={colors.positive} $noMargin>
                                Excellent (30%)
                            </Label>
                            <TierValueGroup>
                                <MetricValue $status="positive">
                                    ~${tiers.excellent.maxBuy.toFixed(2)}
                                </MetricValue>
                                <ProfitText $color={colors.positive}>
                                    ~${tiers.excellent.profit.toFixed(2)} Est.
                                    Profit
                                </ProfitText>
                            </TierValueGroup>
                        </TierItem>
                    )}
                </>
            )}

            {/* FEE AUDIT */}
            <Divider>
                <ResultHeading>Fee Audit</ResultHeading>

                <AuditText>
                    Ship: ${Number(settings.shippingRate).toFixed(2)} |
                    Handling: $1.50 + 1% <br />
                    Tax: {settings.taxRate}% | Fees:{" "}
                    {(
                        Number(settings.fvfRate) + Number(settings.adRate)
                    ).toFixed(1)}
                    % | Fixed: ${Number(settings.fixedFee).toFixed(2)}
                </AuditText>

                <DisclaimerText>
                    * Disclaimer: All values are approximate. <br />
                    Profit or loss is not guaranteed.
                </DisclaimerText>
            </Divider>
        </ResultCard>
    );
}
