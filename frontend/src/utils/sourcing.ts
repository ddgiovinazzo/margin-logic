export type ProfitStatus =
    | "success"
    | "warning"
    | "danger"
    | "critical"
    | "neutral";

interface SourcingAnalysis {
    status: ProfitStatus;
    profit: number;
    margin: number;
    label: string;
}

export const calculateSourcingHealth = (
    marketPrice: number,
    breakEven: number,
): SourcingAnalysis => {
    if (breakEven <= 0) {
        return {
            status: "neutral",
            profit: 0,
            margin: 0,
            label: "Awaiting calculation...",
        };
    }

    const profit = marketPrice - breakEven;
    const margin = marketPrice > 0 ? (profit / marketPrice) * 100 : -100;

    if (margin >= 30)
        return { status: "success", profit, margin, label: "✅ High Margin" };
    if (margin >= 15)
        return { status: "warning", profit, margin, label: "⚖️ Fair Margin" };
    if (margin >= 5)
        return { status: "danger", profit, margin, label: "⚠️ Thin Margin" };

    return {
        status: "critical",
        profit,
        margin,
        label: "🚫 Potential Loss",
    };
};
