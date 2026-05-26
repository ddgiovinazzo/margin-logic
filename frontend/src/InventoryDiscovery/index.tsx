import { useState } from "react";
import { SearchBar } from "./SearchBar";

type StatusType = "idle" | "loading" | "success" | "error";

export function InventoryDiscovery() {
    const [status, setStatus] = useState<StatusType>("idle");

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
        </>
    );
}
