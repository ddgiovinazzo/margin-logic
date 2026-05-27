import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ResultsList } from "./ResultsList";

export type StatusType = "idle" | "loading" | "success" | "error";

export function InventoryDiscovery() {
    const [status, setStatus] = useState<StatusType>("idle");
    const testResults = ["Result 1", "Result 2", "Result 3"];

    function handleSearchSubmit(query: string) {
        setStatus("loading");
        console.info("Routing search payload to AWS Lambda proxy node:", query);
    }

    return (
        <>
            <SearchBar
                onSearchSubmit={handleSearchSubmit}
                isLoading={status === "loading"}
            />
            <ResultsList status={status} results={testResults} />
        </>
    );
}
