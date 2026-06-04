import styled from "styled-components";
import { DESIGN_PALETTE } from "../../utils/colors";

const ErrorContainer = styled.div`
    background-color: ${DESIGN_PALETTE.SIGNAL_ERROR_BG};
    border: 1px solid ${DESIGN_PALETTE.SIGNAL_ERROR_STROKE};
    color: ${DESIGN_PALETTE.SIGNAL_ERROR_TEXT};
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
`;

const ErrorIcon = styled.span`
    font-size: 1.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

interface ErrorDisplayProps {
    message?: string;
}

export function ErrorDisplay({
    message = "An error occurred while fetching results. Please try again.",
}: ErrorDisplayProps) {
    return (
        <ErrorContainer role="alert">
            <ErrorIcon aria-hidden="true">⚠️</ErrorIcon>
            <div>{message}</div>
        </ErrorContainer>
    );
}
