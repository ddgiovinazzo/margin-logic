/**
 * MARGINLOGIC COMPONENT LIBRARY GUIDELINES
 * ========================================
 * * DESIGN PHILOSOPHY:
 * - Minimalist, high-contrast, and Mobile-First.
 * - Prioritize "Sourcing Confidence": Immediate visual feedback.
 * * UNIT STANDARDS (rem vs px):
 * - USE 'rem' for: Font-sizes, Margins, Padding, and Widths/Heights.
 * (Ensures accessibility/scalability with system settings).
 * - USE 'px' for: Borders, Thin Dividers, and specific Shadow offsets.
 * (Maintains a crisp, sharp "ink" look).
 * * TOUCH-TARGET PROTOCOL:
 * - Interactive elements must have a minimum of 1rem (16px) padding
 * to ensure usability in store aisles.
 */

import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./colors";
import { ProfitStatus } from "../utils/sourcing";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.textPrimary};
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
  }
`;

export const Container = styled.main`
    padding: 1.25rem;
    max-width: 500px;
    margin: 0 auto;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 800;
    color: ${colors.textPrimary};
    text-align: center;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: ${colors.textSecondary};
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const InputGrid = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 1.5rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input.attrs({
    onWheel: (e) => e.currentTarget.blur(),
})`
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    border: 2px solid ${colors.border};
    border-radius: 12px;
    background-color: ${colors.surface};
    transition: all 0.2s;

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        background-color: ${colors.background};
        /* 0D appends ~5% opacity to the primary hex color */
        box-shadow: 0 0 0 4px ${colors.primary}0D;
    }
`;

export const ResultCard = styled.section<{ $status: ProfitStatus }>`
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 16px;
    transition: all 0.3s ease;
    text-align: center;
    background-color: ${(props) =>
        colors[`${props.$status}Bg` as keyof typeof colors] || colors.surface};
    border: 2px solid
        ${(props) =>
            colors[props.$status as keyof typeof colors] || colors.border};
`;

export const PriceDisplay = styled.div`
    font-size: 3.5rem;
    font-weight: 900;
    color: ${colors.textPrimary};
    letter-spacing: -2px;
`;

/* RESTORED: For sub-labels and instructions */
export const HelpText = styled.p`
    font-size: 0.85rem;
    color: ${colors.textMuted};
    margin-top: 0.5rem;
    line-height: 1.4;
`;

export const GhostButton = styled.button`
    width: 100%;
    padding: 1rem;
    margin-top: 0.75rem;
    background: transparent;
    color: ${colors.textSecondary};
    font-size: 0.9rem;
    font-weight: 600;
    border: 2px solid ${colors.border};
    border-radius: 12px;
    cursor: pointer;

    &:active {
        background-color: ${colors.surface};
    }
`;

export const SectionLabel = styled.h2`
    font-size: 0.65rem;
    font-weight: 800;
    color: ${colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 1.5rem 0 0.5rem 0;
    border-bottom: 1px solid ${colors.border};
    padding-bottom: 0.25rem;
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

export const AppHeader = styled.header`
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const Divider = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    /* 1A appends ~10% opacity to the primary hex color */
    border-top: 1px solid ${colors.primary}1A;
    /* Using hex opacity with the primary color allows the line to naturally adapt 
       to the different colored backgrounds of the ResultCard */
`;

export const MetricsRow = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const MetricValue = styled.div`
    font-size: 1.4rem;
    font-weight: 900;
`;

export const StatusLabel = styled.p`
    margin-top: 0.75rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: inherit; /* Inherits the specific text color of the current ResultCard status */
`;

export const ErrorBanner = styled.div`
    background-color: ${colors.dangerBg};
    color: ${colors.critical};
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    text-align: center;
    border: 1px solid ${colors.danger};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;
