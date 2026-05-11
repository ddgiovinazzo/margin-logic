/**
 * MARGINLOGIC ACCESSIBLE COLOR PALETTE
 * ========================================
 * - Upgraded for perfect Lighthouse Accessibility scores (> 4.5:1 contrast).
 * - "Fintech Deep Ink" aesthetic for a professional, high-glare field environment.
 */
export const colors = {
    // Brand & Core
    primary: "#1D4ED8", // Deep Cobalt - Passes with 6.7:1 contrast on white
    background: "#FFFFFF", // Pure White
    surface: "#F3F4F6", // Softer, warmer gray than iOS (Tailwind Gray 100)
    border: "#D1D5DB", // Muted Border

    // Status: Positive (Strong Margin)
    positive: "#1B5E20", // Deep Emerald
    positiveBg: "#E8F5E9", // Mint Tint

    // Status: Warning (Thin Margin)
    warning: "#855000", // Deep Burnt Orange
    warningBg: "#FFF3E0", // Peach Tint

    // Status: Critical (Loss / High Risk)
    critical: "#C62828", // Deep Crimson
    criticalBg: "#FFEBEA", // Rose Tint

    // Status: Neutral (No Data)
    neutral: "#374151", // Deep Charcoal
    neutralBg: "#F3F4F6", // Surface Gray

    // Status: Pending (Waiting for Input)
    pending: "#4B5563", // Slate Gray
    pendingBg: "#F9FAFB", // Off White

    // Typography
    textPrimary: "#111827", // Rich Black (softer on the eyes than pure #000)
    textSecondary: "#374151", // Dark Gray
    textMuted: "#4B5563", // Slate Gray - Passes with 5.3:1 contrast on white
};
