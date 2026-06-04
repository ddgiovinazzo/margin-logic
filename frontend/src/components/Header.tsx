import styled from "styled-components";
import { DESIGN_PALETTE } from "../utils/colors";

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    width: 100%;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const BrandIcon = styled.span`
    color: ${DESIGN_PALETTE.PRIMARY_BRAND};
`;

const Subtitle = styled.span`
    font-size: 0.85rem;
    font-weight: 500;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    background-color: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
`;

export function Header() {
    return (
        <HeaderContainer>
            <Title>
                <BrandIcon aria-hidden="true">📈</BrandIcon>
                MarginLogic
            </Title>
            <Subtitle>Discovery Mode</Subtitle>
        </HeaderContainer>
    );
}
