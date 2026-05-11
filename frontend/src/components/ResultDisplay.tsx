import { colors } from "../styles/colors";
import type { PlatformSettings } from "../hooks/useMarginCalculator";
import {
    Divider,
    HelpText,
    Label,
    MetricValue,
    ProfitText,
    ResultCard,
    ResultHeading,
    TierItem,
    TierValueGroup,
} from "../styles/Library";

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
                /* 🚨 UNPROFITABLE STATE: Re-using TierItem but stacking it vertically */
                <TierItem
                    style={{
                        flexDirection: "column",
                        borderBottom: "none",
                        padding: "1.5rem 0",
                    }}
                >
                    <Label
                        style={{
                            color: colors.critical,
                            marginBottom: "0.5rem",
                        }}
                    >
                        Unprofitable Item
                    </Label>
                    <TierValueGroup style={{ alignItems: "center" }}>
                        <MetricValue
                            $status="critical"
                            style={{ fontSize: "2.25rem", lineHeight: 1 }}
                        >
                            DO NOT BUY
                        </MetricValue>
                        <ProfitText
                            $color={colors.critical}
                            style={{ marginTop: "0.5rem" }}
                        >
                            ~${baseLossAmount.toFixed(2)} Est. Loss (If Free)
                        </ProfitText>
                    </TierValueGroup>
                </TierItem>
            ) : (
                /* ✅ PROFITABLE STATE: Standard Horizontal Ladder */
                <>
                    <TierItem>
                        <Label
                            style={{ color: colors.critical, marginBottom: 0 }}
                        >
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
                            <Label
                                style={{
                                    color: colors.textSecondary,
                                    marginBottom: 0,
                                }}
                            >
                                Standard (10%)
                            </Label>
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
                            <Label
                                style={{
                                    color: colors.warning,
                                    marginBottom: 0,
                                }}
                            >
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
                            <Label
                                style={{
                                    color: colors.positive,
                                    marginBottom: 0,
                                }}
                            >
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
                <HelpText
                    style={{ fontSize: "0.7rem", marginBottom: "0.5rem" }}
                >
                    Ship: ${Number(settings.handlingFee).toFixed(2)} | Tax:{" "}
                    {settings.taxRate}% | Fees:{" "}
                    {(
                        Number(settings.fvfRate) + Number(settings.adRate)
                    ).toFixed(1)}
                    % | Fixed: ${Number(settings.fixedFee).toFixed(2)}
                </HelpText>
                <HelpText
                    style={{
                        fontSize: "0.6rem",
                        fontStyle: "italic",
                        opacity: 0.8,
                    }}
                >
                    * Disclaimer: All values are approximate. <br />
                    Profit or loss is not guaranteed.
                </HelpText>
            </Divider>
        </ResultCard>
    );
}
