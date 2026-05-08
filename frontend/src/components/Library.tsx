import styled, { createGlobalStyle } from "styled-components";

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

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #f8f9fa;
    color: #1a1a1a;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
  }

  input {
    color: #1a1a1a !important;
    font-family: inherit;
  }
`;

export const Container = styled.div`
    padding: 1.25rem;
    max-width: 500px;
    margin: 0 auto;
    background-color: #ffffff;
    min-height: 100vh;
`;

export const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 0.25rem;
    text-align: center;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #666;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const InputGrid = styled.div`
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
    onWheel: (e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur(),
})`
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    background-color: #fafafa;
    -webkit-appearance: none;
    appearance: none;

    &:focus {
        outline: none;
        border-color: #0056b3;
        background-color: #ffffff;
        box-shadow: 0 0 0 4px rgba(0, 86, 179, 0.1);
    }
`;

export const ResultCard = styled.div<{ $isPositive?: boolean }>`
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 16px;
    background-color: ${(props) => (props.$isPositive ? "#e7f5ed" : "#f8f9fa")};
    border: 2px solid ${(props) => (props.$isPositive ? "#2e7d32" : "#dee2e6")};
    text-align: center;
    transition: all 0.3s ease;
`;

export const PriceDisplay = styled.div`
    font-size: 3.5rem;
    font-weight: 900;
    color: #1a1a1a;
    margin: 0.5rem 0;
    letter-spacing: -2px;
`;

export const HelpText = styled.p`
    font-size: 0.85rem;
    color: #6c757d;
    margin-top: 0.5rem;
    line-height: 1.4;
`;

export const Badge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #e9ecef;
    color: #495057;
`;

export const Button = styled.button`
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    background-color: #1a1a1a;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:active {
        background-color: #333333;
        transform: translateY(1px);
    }
`;

export const GhostButton = styled.button`
    width: 100%;
    padding: 1rem;
    margin-top: 0.75rem;
    background-color: transparent;
    color: #666;
    font-size: 0.9rem;
    font-weight: 600;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
        background-color: #f8f9fa;
        border-color: #ccc;
    }
`;

export const SectionLabel = styled.h2`
    font-size: 0.65rem;
    font-weight: 800;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 1.5rem 0 0.5rem 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.25rem;
`;
