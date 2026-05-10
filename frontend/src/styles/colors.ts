/**
 * MARGINLOGIC ACCESSIBLE COLOR PALETTE
 * ========================================
 * - Standard colors (positive, critical, etc.) are "Deep Ink" versions
 * designed to pass WCAG AA contrast on their respective Bg tints.
 */
export const colors = {
    // Brand & Core
    primary: "#007AFF", // iOS Blue
    background: "#FFFFFF", // Pure White
    surface: "#F2F2F7", // Light Gray Surface (iOS style)
    border: "#D1D1D6", // Standard Border

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
    neutral: "#424242", // Charcoal
    neutralBg: "#F2F2F7", // Surface Gray

    // Status: Pending (Waiting for Input)
    pending: "#616161", // Medium Gray
    pendingBg: "#F9F9F9", // Off White

    // Typography
    textPrimary: "#1C1C1E", // Near Black
    textSecondary: "#3A3A3C", // Dark Gray
    textMuted: "#636366", // Slate Gray
};
