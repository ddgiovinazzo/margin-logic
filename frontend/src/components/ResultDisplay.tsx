import {
    ResultCard,
    Label,
    PriceDisplay,
    SrOnly,
    Divider,
    MetricsRow,
    MetricValue,
    StatusLabel,
    ErrorBanner,
} from "../styles/Library";
import { ProfitStatus } from "../utils/sourcing";

interface ResultDisplayProps {
    status: ProfitStatus;
    isLoading: boolean;
    breakEven: number;
    profit: number;
    margin: number;
    label: string;
    error: string | null;
}

export function ResultDisplay({
    status,
    isLoading,
    breakEven,
    profit,
    margin,
    label,
    error,
}: ResultDisplayProps) {
    return (
        <ResultCard $status={status} aria-live="polite" aria-atomic="true">
            {error && (
                <ErrorBanner>
                    <span aria-hidden="true">⚠️</span> {error}
                </ErrorBanner>
            )}

            <Label as="h2">Break-Even Price</Label>
            <PriceDisplay>
                <SrOnly>The break-even price is </SrOnly>
                {isLoading && !error ? "..." : `$${breakEven.toFixed(2)}`}
            </PriceDisplay>

            <Divider>
                <MetricsRow>
                    <div>
                        <Label>Est. Profit</Label>
                        <MetricValue>${profit.toFixed(2)}</MetricValue>
                    </div>
                    <div>
                        <Label>Margin</Label>
                        <MetricValue>{margin.toFixed(1)}%</MetricValue>
                    </div>
                </MetricsRow>
                <StatusLabel>{label}</StatusLabel>
            </Divider>
        </ResultCard>
    );
}
