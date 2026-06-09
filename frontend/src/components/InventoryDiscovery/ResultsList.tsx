import styled from "styled-components";
import type { StatusType } from ".";
import { SkeletonLoader } from "./SkeletonLoader";
import { ErrorDisplay } from "./ErrorDisplay";
import { DESIGN_PALETTE } from "../../utils/colors";
import type { SearchItem } from "@shared/types";
import { BaseCard, BaseBadge, SubHeading } from "../CoreUI";

interface ResultsListProps {
    status: StatusType;
    results: SearchItem[];
    onItemSelect: (item: SearchItem) => void;
}

const ResultsTitle = styled(SubHeading)`
    font-size: 1.15rem;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    margin: 1.5rem 0 0.75rem 0;
`;

const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;

const CardContainer = styled(BaseCard).attrs({ as: "li" })`
    border-radius: 10px;
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    transition:
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        border-color 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 123, 255, 0.08);
        border-color: ${DESIGN_PALETTE.PRIMARY_BRAND};
    }
`;

const ImageWrapper = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 8px;
    background-color: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL}4D;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
`;

const ProductImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const FallbackIcon = styled.div`
    font-size: 1.75rem;
    user-select: none;
`;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0; /* Ensures text truncation works on flex children */
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
`;

const ConditionBadge = styled(BaseBadge)<{ $isNew: boolean }>`
    background-color: ${(props) =>
        props.$isNew ? "rgba(40, 167, 69, 0.1)" : "rgba(108, 117, 125, 0.1)"};
    color: ${(props) =>
        props.$isNew
            ? DESIGN_PALETTE.SIGNAL_SUCCESS
            : DESIGN_PALETTE.TEXT_MUTED};
`;

const ItemTitle = styled.h3`
    font-size: 0.95rem;
    font-weight: 600;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: 0.25rem;
`;

const ItemPrice = styled.span`
    font-size: 1.15rem;
    font-weight: 700;
    color: ${DESIGN_PALETTE.PRIMARY_BRAND};
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const ViewLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    background-color: transparent;
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    text-decoration: none;
    font-size: 0.85rem;
    transition:
        background-color 0.2s,
        color 0.2s,
        border-color 0.2s;

    &:hover {
        background-color: ${DESIGN_PALETTE.CANVAS_BACKGROUND};
        color: ${DESIGN_PALETTE.TEXT_MAIN};
        border-color: ${DESIGN_PALETTE.TEXT_MUTED};
    }
`;

const NoResults = styled.p`
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    font-size: 0.95rem;
    margin-top: 1.5rem;
    text-align: center;
`;

export function ResultsList({
    status,
    results,
    onItemSelect,
}: ResultsListProps) {
    if (status === "idle") return null;
    if (status === "error") return <ErrorDisplay />;
    if (status === "loading") return <SkeletonLoader />;

    if (results.length === 0) {
        return <NoResults>No matching items discovered.</NoResults>;
    }

    return (
        <>
            <ResultsTitle>Discovered Inventory</ResultsTitle>
            <ListContainer>
                {results.map((item) => {
                    const isNew =
                        item.condition?.toLowerCase().includes("new") || false;

                    return (
                        <CardContainer
                            key={item.itemId}
                            onClick={() => onItemSelect(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onItemSelect(item);
                                }
                            }}
                        >
                            <ImageWrapper>
                                {item.image ? (
                                    <ProductImg
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        onError={(e) => {
                                            // Replace with fallback icon on error
                                            e.currentTarget.style.display =
                                                "none";
                                            const parent =
                                                e.currentTarget.parentElement;
                                            if (parent) {
                                                const iconDiv =
                                                    document.createElement(
                                                        "div",
                                                    );
                                                iconDiv.className =
                                                    "fallback-icon";
                                                iconDiv.innerText = "📦";
                                                iconDiv.style.fontSize =
                                                    "1.75rem";
                                                parent.appendChild(iconDiv);
                                            }
                                        }}
                                    />
                                ) : (
                                    <FallbackIcon aria-hidden="true">
                                        📦
                                    </FallbackIcon>
                                )}
                            </ImageWrapper>

                            <DetailsWrapper>
                                <CardHeader>
                                    <ConditionBadge $isNew={isNew}>
                                        {item.condition}
                                    </ConditionBadge>
                                </CardHeader>
                                <ItemTitle title={item.title}>
                                    {item.title}
                                </ItemTitle>
                                <PriceRow>
                                    <ItemPrice>
                                        {item.currency === "USD" ? "$" : ""}
                                        {parseFloat(item.price).toFixed(2)}
                                    </ItemPrice>
                                    <ActionButtons
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {item.itemWebUrl && (
                                            <ViewLink
                                                href={item.itemWebUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="View listing on eBay"
                                                aria-label={`View ${item.title} on eBay`}
                                            >
                                                ↗
                                            </ViewLink>
                                        )}
                                    </ActionButtons>
                                </PriceRow>
                            </DetailsWrapper>
                        </CardContainer>
                    );
                })}
            </ListContainer>
        </>
    );
}
