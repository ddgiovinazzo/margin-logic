import styled, { keyframes } from "styled-components";
import { DESIGN_PALETTE } from "../../utils/colors";

const shimmer = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 1.5rem;
`;

const SkeletonItem = styled.div`
    height: 3.5rem;
    width: 100%;
    border-radius: 6px;
    background: linear-gradient(
        90deg,
        ${DESIGN_PALETTE.BORDER_NEUTRAL} 25%,
        ${DESIGN_PALETTE.CANVAS_BACKGROUND} 50%,
        ${DESIGN_PALETTE.BORDER_NEUTRAL} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite linear;
    border: 1px solid ${DESIGN_PALETTE.CANVAS_BACKGROUND};
`;

export function SkeletonLoader() {
    return (
        <SkeletonContainer aria-label="Loading results" aria-live="polite">
            <SkeletonItem />
            <SkeletonItem style={{ width: "92%" }} />
            <SkeletonItem style={{ width: "85%" }} />
        </SkeletonContainer>
    );
}
