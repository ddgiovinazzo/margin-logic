import styled from "styled-components";
import type { StatusType } from ".";
import { SkeletonLoader } from "./SkeletonLoader";
import { ErrorDisplay } from "./ErrorDisplay";
import { DESIGN_PALETTE } from "../../utils/colors";

interface ResultsListProps {
    status: StatusType;
    results: string[];
}

const ResultsTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    margin: 1.5rem 0 0.75rem 0;
`;

const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
`;

const ResultItem = styled.li`
    background-color: ${DESIGN_PALETTE.SURFACE_CARD};
    border: 1px solid ${DESIGN_PALETTE.BORDER_NEUTRAL};
    border-radius: 6px;
    padding: 1rem;
    color: ${DESIGN_PALETTE.TEXT_MAIN};
    font-weight: 500;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition:
        transform 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out,
        border-color 0.15s ease-in-out;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
        border-color: ${DESIGN_PALETTE.PRIMARY_BRAND};
    }
`;

const NoResults = styled.p`
    color: ${DESIGN_PALETTE.TEXT_MUTED};
    font-size: 0.95rem;
    margin-top: 1.5rem;
    text-align: center;
`;

export function ResultsList({ status, results }: ResultsListProps) {
    if (status === "idle") return null;
    if (status === "error") return <ErrorDisplay />;
    if (status === "loading") return <SkeletonLoader />;

    if (results.length === 0) {
        return <NoResults>No matching items discovered.</NoResults>;
    }

    return (
        <>
            <ResultsTitle>Search Results</ResultsTitle>
            <ListContainer>
                {results.map((result) => (
                    <ResultItem key={result}>{result}</ResultItem>
                ))}
            </ListContainer>
        </>
    );
}
