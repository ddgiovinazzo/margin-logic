import {
    ResultCard,
    Label,
    PriceDisplay,
    Divider,
    MetricsRow,
    MetricValue,
    StatusLabel,
    ResultHeading,
} from "../styles/Library";
import { ProfitStatus } from "../utils/sourcing";

interface ResultDisplayProps {
    status: ProfitStatus;
    breakEven: number;
    profit: number | "-";
    margin: number | "-";
    label: string;
}

export function ResultDisplay({
    status,
    breakEven,
    profit,
    margin,
    label,
}: ResultDisplayProps) {
    return (
        <ResultCard $status={status} aria-live="polite">
            <ResultHeading>Break-Even Price</ResultHeading>
            <PriceDisplay>${breakEven.toFixed(2)}</PriceDisplay>

            <Divider>
                <MetricsRow>
                    <div>
                        <Label>Est. Profit</Label>
                        {/* ✨ Added $status here to color the number */}
                        <MetricValue $status={status}>
                            {typeof profit === "number"
                                ? `$${profit.toFixed(2)}`
                                : profit}
                        </MetricValue>
                    </div>
                    <div>
                        <Label>Margin</Label>
                        {/* ✨ Added $status here to color the number */}
                        <MetricValue $status={status}>
                            {typeof margin === "number"
                                ? `${margin.toFixed(1)}%`
                                : margin}
                        </MetricValue>
                    </div>
                </MetricsRow>
                <StatusLabel>{label}</StatusLabel>
            </Divider>
        </ResultCard>
    );
}
