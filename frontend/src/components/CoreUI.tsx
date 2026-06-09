import styled, { createGlobalStyle, css } from "styled-components";
import { DESIGN_PALETTE } from "../utils/colors";

export const GlobalStyle = createGlobalStyle`
    ${css`
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background-color: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
            color: ${DESIGN_PALETTE.TEXT_MAIN};
        }
    `}
`;

export const Container = styled.main`
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    padding: 1rem;
    flex-direction: column;
`;

export const PrimaryInput = styled.input`
    flex: 1;
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    border-radius: 6px;
    font-size: 1rem;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    padding: 0.75rem;
    outline: none;
    background-color: ${DESIGN_PALETTE.SURFACE_CARD};
    transition: border-color 0.2s ease-in-out;

    &:focus {
        border-color: ${DESIGN_PALETTE.PRIMARY_FOCUS};
    }
`;

export const PrimaryButton = styled.button`
    background-color: ${DESIGN_PALETTE.PRIMARY_BRAND};
    color: #ffffff;
    font-weight: 600;
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition:
        background-color 0.2s ease-in-out,
        opacity 0.2s ease-in-out;

    &:hover {
        background-color: ${DESIGN_PALETTE.PRIMARY_HOVER};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: ${DESIGN_PALETTE.PRIMARY_HOVER};
    }
`;

// ============================================================================
// STYLING INSTRUCTION FOR AI AGENTS & DEVELOPERS:
// 1. PROJECT-LEVEL REUSABLE COMPONENTS: Maintain and reuse components defined here.
//    Do not create redundant base cards, badges, headings, or buttons.
// 2. EXTENSION PATTERN: For custom components (e.g. specialized product cards),
//    extend these base components (e.g. const ProductCard = styled(BaseCard))
//    rather than styling from scratch. Override only necessary properties.
// 3. COLOR PALETTE: Always use tokens from DESIGN_PALETTE in colors.ts.
// ============================================================================

// --- Project Level Reusable Styled Components ---

export const BaseCard = styled.div`
    background-color: ${DESIGN_PALETTE.SURFACE_CARD};
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

export const BaseBadge = styled.span`
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const SubHeading = styled.h3`
    font-size: 0.85rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
`;
