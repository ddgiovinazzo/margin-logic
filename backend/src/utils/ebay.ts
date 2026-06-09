import type { SearchItem } from "@shared/types";

interface TokenCache {
    accessToken: string;
    expiresAt: number; // Timestamp in milliseconds
}

let cachedToken: TokenCache | null = null;

/**
 * Retrieves an OAuth application access token using the Client Credentials grant.
 * Caches the token in memory to avoid repetitive token requests within the same execution environment.
 */
async function getEbayAccessToken(
    clientId: string,
    clientSecret: string,
    environment: string,
): Promise<string> {
    const isSandbox = environment === "sandbox";
    const authUrl = isSandbox
        ? "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
        : "https://api.ebay.com/identity/v1/oauth2/token";

    // Reuse token if it has more than 60 seconds left before expiration
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) {
        return cachedToken.accessToken;
    }

    const credentialsBase64 = Buffer.from(
        `${clientId}:${clientSecret}`,
    ).toString("base64");

    const bodyParams = new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
    });

    const response = await fetch(authUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentialsBase64}`,
        },
        body: bodyParams.toString(),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(
            `eBay OAuth request failed with status ${response.status}: ${errText}`,
        );
    }

    const data = (await response.json()) as {
        access_token: string;
        expires_in: number;
    };

    cachedToken = {
        accessToken: data.access_token,
        // Calculate expiration epoch, buffer by subtracting 5 seconds
        expiresAt: Date.now() + (data.expires_in - 5) * 1000,
    };

    return cachedToken.accessToken;
}

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
export async function searchEbayItems(
    query: string,
    clientId: string,
    clientSecret: string,
    environment: string,
): Promise<SearchItem[]> {
    const accessToken = await getEbayAccessToken(
        clientId,
        clientSecret,
        environment,
    );

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
