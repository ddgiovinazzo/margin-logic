import styled from "styled-components";

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

// 1. The Layout Shell
export const Container = styled.div`
    padding: 1.25rem; 
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    max-width: 500px;
    margin: 0 auto;
    background-color: #ffffff;
    min-height: 100vh;
`;

// 2. High-Contrast Typography
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

// 3. Form Elements
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

export const Input = styled.input`
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

// 4. The Result Card (The "Should I Buy?" Engine)
export const ResultCard = styled.div<{ $isPositive?: boolean }>`
    margin-top: 2rem;
    padding: 1.5rem;
    border-radius: 16px;
    background-color: ${props => props.$isPositive ? "#e7f5ed" : "#f8f9fa"};
    border: 2px solid ${props => props.$isPositive ? "#2e7d32" : "#dee2e6"};
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

// 5. Utility Atoms
export const Badge = styled.span`
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #e9ecef;
    color: #495057;
`;
