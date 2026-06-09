import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { ResultsList } from "./ResultsList";
import { CalculatorModal } from "./CalculatorModal";
import { useMarginCalculator } from "../../hooks/useMarginCalculator";
import type { SearchItem } from "@shared/types";

export type StatusType = "idle" | "loading" | "success" | "error";

export function InventoryDiscovery() {
    const [status, setStatus] = useState<StatusType>("idle");
    const [results, setResults] = useState<SearchItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SearchItem | null>(null);

    const {
        settings,
        marketPrice,
        analysis,
        isModalOpen,
        calculatePrice,
        handleSettingsUpdate,
        closeModal,
    } = useMarginCalculator();

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

            const data = (await response.json()) as { results?: SearchItem[] };
            setResults(data.results || []);
            setStatus("success");
        } catch (error) {
            console.error("Failed to fetch search results from Lambda:", error);
            setStatus("error");
            setResults([]);
        }
    }

    const handleItemClick = (item: SearchItem) => {
        setSelectedItem(item);
        calculatePrice(parseFloat(item.price));
    };

    return (
        <>
            <SearchBar
                onSearchSubmit={handleSearchSubmit}
                isLoading={status === "loading"}
            />
            <ResultsList
                status={status}
                results={results}
                onItemSelect={handleItemClick}
            />
            {selectedItem && (
                <CalculatorModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={selectedItem.title}
                    marketPrice={
                        Number(marketPrice) || parseFloat(selectedItem.price)
                    }
                    settings={settings}
                    analysis={analysis}
                    onSettingsUpdate={handleSettingsUpdate}
                    onRecalculate={calculatePrice}
                />
            )}
        </>
    );
}
