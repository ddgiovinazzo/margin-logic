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

  body {
    background-color: ${colors.background};
    color: ${colors.textPrimary};
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
    overscroll-behavior-y: none; /* Prevents "bounce" on mobile */
  }
`;

/**
 * LAYOUT COMPONENTS
 */

export const Container = styled.main`
    padding: 0.75rem 1.25rem;
    max-width: 500px;
    margin: 0 auto;
    height: 100vh;
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

export const HelpText = styled.p`
    font-size: 0.85rem;
    color: ${colors.textMuted};
    margin-top: 0.25rem;
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

export const Label = styled.label`
    display: block;
    font-size: 0.8rem; /* Bumped up */
    font-weight: 700;
    color: ${colors.textSecondary};
    margin-bottom: 0.5rem;
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

export const PriceDisplay = styled.div`
    font-size: 3rem;
    font-weight: 900;
    color: ${colors.textPrimary};
    letter-spacing: -2px;
    line-height: 1;
    margin-bottom: 1rem;
`;

export const Divider = styled.div`
    margin-top: 1rem;
    padding-top: 1.25rem;
`;

export const MetricsRow = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 1rem;
`;

export const MetricValue = styled.div<{ $status?: ProfitStatus }>`
    font-size: 1.25rem;
    font-weight: 900;
    color: ${(props) =>
        props.$status
            ? colors[props.$status as keyof typeof colors] || colors.textPrimary
            : colors.textPrimary};
`;

export const StatusLabel = styled.p`
    margin-top: 1rem;
    font-weight: 800;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: inherit;
`;

/**
 * BUTTONS & ACTIONS
 */

export const ActionBar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.25rem 2rem 1.25rem; /* Extra padding for iOS bottom bar */
    background: linear-gradient(to top, ${colors.background} 80%, transparent);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 500px;
    margin: 0 auto;
`;

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

export const ErrorBanner = styled.div`
    background-color: ${colors.criticalBg};
    color: ${colors.critical};
    padding: 0.85rem;
    border-radius: 12px;
    margin: 0.5rem 0;
    font-size: 0.85rem;
    font-weight: 800;
    text-align: center;
    border: 1px solid ${colors.critical}30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;

export const SrOnly = styled.span`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
`;

export const TierItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-of-type {
        border-bottom: none;
    }
`;

export const TierValueGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const ProfitText = styled.span<{ $color?: string }>`
    font-size: 0.75rem;
    font-weight: 800;
    color: ${(props) => props.$color || "inherit"};
    margin-top: 0.15rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;
