/**
 * MARGINLOGIC COMPONENT LIBRARY
 * ========================================
 * * DESIGN PHILOSOPHY:
 * - Minimalist, high-contrast, and Mobile-First.
 * - Prioritize "Sourcing Confidence": Immediate visual feedback.
 * - WCAG AA compliant contrast ratios for field use.
 * * * UNIT STANDARDS:
 * - 'rem' for: Typography, Spacing, and Layout.
 * - 'px' for: Borders and fine Dividers.
 */

import styled, { createGlobalStyle } from "styled-components";
import { colors } from "../utils/colors";
import { ProfitStatus } from "../utils/sourcing";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    height: 100%;
    height: -webkit-fill-available;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.textPrimary};
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
    overscroll-behavior-y: none;
  }
`;

/**
 * LAYOUT COMPONENTS
 */

export const Container = styled.main`
    padding: 0.75rem 1.25rem;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
    max-width: 500px;
    margin: 0 auto;

    height: 100vh;
    height: 100dvh;
    height: -webkit-fill-available;

    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const AppHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
    font-size: 2.25rem; /* Massive, bold branding */
    font-weight: 900;
    color: ${colors.textPrimary};
    letter-spacing: -0.03em; /* Tighter tracking looks more modern */
    margin: 0;
`;

export const DisclaimerText = styled.p`
    font-size: 0.65rem;
    font-style: italic;
    color: ${colors.textMuted};
    margin-top: 0.5rem;
    line-height: 1.4;
`;

/**
 * FORM COMPONENTS
 */

export const InputGrid = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    flex: 1;
`;

export const FlexForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const ActionFooter = styled.div`
    margin-top: auto;
    padding-top: 1rem;
    padding-bottom: 0.5rem; /* Extra breathing room above the iOS home bar */
`;

export const InputRow = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SectionLabel = styled.h2`
    font-size: 0.95rem; /* Bumped up from tiny text */
    font-weight: 800;
    color: ${colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 1.5rem 0 1.25rem 0; /* Extra breathing room */
    border-bottom: 2px solid ${colors.border}; /* Thicker, more grounded divider */
    padding-bottom: 0.5rem;

    &:first-of-type {
        margin-top: 0;
    }
`;

export const Label = styled.label<{ $color?: string; $noMargin?: boolean }>`
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${(props) => props.$color || colors.textSecondary};
    margin-bottom: ${(props) => (props.$noMargin ? "0" : "0.5rem")};
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const Input = styled.input.attrs({
    onWheel: (e) => (e.target as HTMLInputElement).blur(),
})`
    width: 100%;
    padding: 1rem; /* Huge tap target */
    font-size: 1.25rem; /* Massive numbers */
    font-weight: 800; /* Bold numbers for quick reading */
    border: 1px solid ${colors.border};
    border-radius: 12px;
    background-color: ${colors.surface};
    color: ${colors.textPrimary};
    transition: all 0.2s ease-in-out;
    appearance: none; /* Removes mobile default styling */

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        background-color: ${colors.background};
        box-shadow: 0 0 0 3px ${colors.neutralBg}; /* Accessible focus ring */
    }

    &::placeholder {
        color: ${colors.textMuted};
        opacity: 0.5;
    }
`;

/**
 * MODAL & RESULT COMPONENTS
 */

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(28, 28, 30, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1.25rem;

    > div {
        width: 100%;
        max-width: 400px;
    }
`;

export const ResultCard = styled.section<{ $status: ProfitStatus }>`
    padding: 1.5rem;
    border-radius: 20px;
    text-align: center;
    transition: transform 0.2s ease;

    background-color: ${(props) =>
        colors[`${props.$status}Bg` as keyof typeof colors] || colors.surface};
    border: 2px solid
        ${(props) =>
            colors[props.$status as keyof typeof colors] || colors.surface};
    color: ${(props) =>
        colors[props.$status as keyof typeof colors] || colors.textPrimary};

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const ResultHeading = styled.h2`
    font-size: 0.75rem;
    font-weight: 800;
    color: inherit;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    opacity: 0.8;
`;

export const Divider = styled.div`
    margin-top: 1rem;
    padding-top: 1.25rem;
`;

export const MetricValue = styled.div<{
    $status?: ProfitStatus;
    $isLarge?: boolean;
}>`
    font-size: ${(props) => (props.$isLarge ? "2.25rem" : "1.25rem")};
    line-height: ${(props) => (props.$isLarge ? "1" : "inherit")};
    font-weight: 900;
    color: ${(props) =>
        props.$status
            ? colors[props.$status as keyof typeof colors] || colors.textPrimary
            : colors.textPrimary};
`;

/**
 * BUTTONS & ACTIONS
 */

export const PrimaryButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: ${colors.primary};
    color: white;
    font-size: 1.1rem;
    font-weight: 800;
    border: none;
    border-radius: 12px;
    margin-top: 0.5rem;
    cursor: pointer;

    &:active {
        transform: scale(0.98);
    }
`;

export const GhostButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    color: ${colors.textSecondary};
    font-size: 0.9rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;

    &:active {
        background-color: ${colors.surface};
    }
`;

/**
 * FEEDBACK COMPONENTS
 */

export const TierItem = styled.div<{ $isLoss?: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.$isLoss ? "center" : "space-between")};
    align-items: center;
    padding: ${(props) => (props.$isLoss ? "1.5rem 0" : "0.85rem 0")};
    flex-direction: ${(props) => (props.$isLoss ? "column" : "row")};
    border-bottom: ${(props) =>
        props.$isLoss ? "none" : "1px solid rgba(0, 0, 0, 0.05)"};

    &:last-of-type {
        border-bottom: none;
    }
`;

export const TierValueGroup = styled.div<{ $alignCenter?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.$alignCenter ? "center" : "flex-end")};
    gap: ${(props) => (props.$alignCenter ? "0.5rem" : "0")};
`;

export const ProfitText = styled.span<{ $color?: string }>`
    font-size: 0.75rem;
    font-weight: 800;
    color: ${(props) => props.$color || "inherit"};
    margin-top: 0.15rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const AuditText = styled.p`
    font-size: 0.7rem;
    color: ${colors.textMuted};
    margin-bottom: 0.5rem;
    line-height: 1.6;
`;
