import {
    ResultCard,
    Label,
    Divider,
    MetricValue,
    ResultHeading,
    HelpText,
} from "../styles/Library";
import { colors } from "../styles/colors";
import type { PlatformSettings } from "../hooks/useMarginCalculator";

interface ResultDisplayProps {
    tiers: {
        excellent: number;
        healthy: number;
        thin: number;
        breakEven: number;
    };
    settings: PlatformSettings;
    label: string;
}

export function ResultDisplay({ tiers, settings, label }: ResultDisplayProps) {
    return (
        <ResultCard $status="neutral">
            <ResultHeading>{label}</ResultHeading>

            {/* 1. Break-Even (Bottom of the ladder) */}
            <TierItem>
                <Label style={{ color: colors.critical }}>
                    Break-Even (0%)
                </Label>
                <MetricValue $status="critical">
                    ${tiers.breakEven.toFixed(2)}
                </MetricValue>
            </TierItem>

            {/* 2. Standard (10%) */}
            <TierItem>
                <Label style={{ color: colors.textSecondary }}>
                    Standard (10%)
                </Label>
                <MetricValue $status="neutral">
                    ${tiers.thin.toFixed(2)}
                </MetricValue>
            </TierItem>

            {/* 3. Healthy (20%) */}
            <TierItem>
                <Label style={{ color: colors.warning }}>Healthy (20%)</Label>
                <MetricValue $status="warning">
                    ${tiers.healthy.toFixed(2)}
                </MetricValue>
            </TierItem>

            {/* 4. Excellent (Top of the ladder) */}
            <TierItem>
                <Label style={{ color: colors.positive }}>
                    Excellent (30%)
                </Label>
                <MetricValue $status="positive">
                    ${tiers.excellent.toFixed(2)}
                </MetricValue>
            </TierItem>

            <Divider>
                <ResultHeading>Fee Audit</ResultHeading>
                <HelpText style={{ fontSize: "0.7rem" }}>
                    Ship: ${settings.handlingFee} | Tax: {settings.taxRate}% |
                    Fees:{" "}
                    {(
                        Number(settings.fvfRate) + Number(settings.adRate)
                    ).toFixed(1)}
                    %
                </HelpText>
            </Divider>
        </ResultCard>
    );
}

import styled from "styled-components";
const TierItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-of-type {
        border-bottom: none;
    }
`;
