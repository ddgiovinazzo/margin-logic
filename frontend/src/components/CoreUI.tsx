import styled, { createGlobalStyle } from "styled-components";
import { DESIGN_PALETTE } from "../utils/colors";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
        color: ${DESIGN_PALETTE.TEXT_MAIN};
        overscroll-behavior-y: none;
    }
`;

export const Container = styled.main`
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    overflow-x: hidden;
    padding: max(1rem, env(safe-area-inset-top)) 1rem
        max(1rem, env(safe-area-inset-bottom)) 1rem;
`;

export const PrimaryInput = styled.input`
    flex: 1;
    width: 100%;
    min-width: 0;
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
