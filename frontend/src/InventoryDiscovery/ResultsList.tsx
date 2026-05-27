import type { StatusType } from ".";

interface ResultsListProps {
    status: StatusType;
    results: string[];
}

export function ResultsList({ status, results }: ResultsListProps) {
    if (status === "idle") return null;
    if (status === "error") return <p>There was an error.</p>;
    if (status === "loading") return <p>Loading...</p>;
    return (
        <>
            <h2>Search Results:</h2>
            <ul>
                {results.map((result) => (
                    <li key={result}>{result}</li>
                ))}
            </ul>
        </>
    );
}
