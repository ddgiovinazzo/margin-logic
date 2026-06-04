import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ResultsList } from "./ResultsList";

export type StatusType = "idle" | "loading" | "success" | "error";

export function InventoryDiscovery() {
    const [status, setStatus] = useState<StatusType>("idle");
    const [results, setResults] = useState<string[]>([]);

    async function handleSearchSubmit(query: string) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        setStatus("loading");
        console.info(
            "Routing search payload to AWS Lambda proxy node:",
            trimmedQuery,
        );

        const apiBase =
            import.meta.env.VITE_API_URL ||
            (import.meta.env.DEV ? "http://localhost:3000" : "");

        try {
            const url = `${apiBase}/search?query=${encodeURIComponent(trimmedQuery)}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = (await response.json()) as { results?: string[] };
            setResults(data.results || []);
            setStatus("success");
        } catch (error) {
            console.error("Failed to fetch search results from Lambda:", error);
            setStatus("error");
            setResults([]);
        }
    }

    return (
        <>
            <SearchBar
                onSearchSubmit={handleSearchSubmit}
                isLoading={status === "loading"}
            />
            <ResultsList status={status} results={results} />
        </>
    );
}
