export type ProfitStatus =
    | "positive"
    | "warning"
    | "critical"
    | "neutral"
    | "pending";

export interface SourcingHealth {
    status: ProfitStatus;
    profit: number | "-";
    margin: number | "-";
    label: string;
}

export const calculateSourcingHealth = (
    marketPrice: number | "",
    breakEven: number,
): SourcingHealth => {
    // ✨ Handle the "Dash" state
    if (marketPrice === "" || marketPrice === 0) {
        return {
            status: "pending",
            profit: "-",
            margin: "-",
            label: "Enter Average Sold Price to see profit projections",
        };
    }

    const profit = marketPrice - breakEven;
    const margin = (profit / marketPrice) * 100;

    if (margin > 20) {
        return { status: "positive", profit, margin, label: "Strong Margin" };
    } else if (margin > 10) {
        return { status: "warning", profit, margin, label: "Thin Margin" };
    } else if (margin > 0) {
        return {
            status: "critical",
            profit,
            margin,
            label: "High Risk / Break-even",
        };
    } else {
        return { status: "critical", profit, margin, label: "Potential Loss" };
    }
};
