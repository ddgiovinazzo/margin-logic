import type { SearchItem } from "@shared/types";
import { getEbayAccessToken } from "./tokenManager";

interface EbayItemSummary {
    itemId: string;
    title: string;
    price?: {
        value: string;
        currency: string;
    };
    image?: {
        imageUrl: string;
    };
    itemWebUrl?: string;
    condition?: string;
}

interface EbaySearchResponse {
    itemSummaries?: EbayItemSummary[];
}

/**
 * Queries the eBay Buy Browse API for item summaries matching a search query.
 */
export async function searchEbayItems(query: string): Promise<SearchItem[]> {
    const accessToken = await getEbayAccessToken();
    const environment = process.env.EBAY_ENVIRONMENT || "sandbox";

    const isSandbox = environment === "sandbox";
    const baseUrl = isSandbox
        ? "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search"
        : "https://api.ebay.com/buy/browse/v1/item_summary/search";

    const searchUrl = `${baseUrl}?q=${encodeURIComponent(query)}&limit=10`;

    const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(
            `eBay Browse API request failed with status ${response.status}: ${errText}`,
        );
    }

    const data = (await response.json()) as EbaySearchResponse;
    const summaries = data.itemSummaries || [];

    return summaries.map((item) => ({
        itemId: item.itemId,
        title: item.title,
        price: item.price?.value || "0.00",
        currency: item.price?.currency || "USD",
        image: item.image?.imageUrl,
        itemWebUrl: item.itemWebUrl,
        condition: item.condition || "Unknown",
    }));
}
