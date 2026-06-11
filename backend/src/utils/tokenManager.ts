interface TokenCache {
    accessToken: string;
    expiresAt: number; // Timestamp in milliseconds
}

let cachedToken: TokenCache | null = null;

/**
 * Retrieves a cached OAuth token or exchanges environment credentials with the eBay API
 * for a new short-lived Application Access Token.
 */
export async function getEbayAccessToken(): Promise<string> {
    const appId = process.env.EBAY_APP_ID;
    const certId = process.env.EBAY_CERT_ID;
    const environment = process.env.EBAY_ENVIRONMENT || "sandbox";

    if (!appId || !certId) {
        throw new Error(
            "Missing required eBay credentials (EBAY_APP_ID or EBAY_CERT_ID) in environment.",
        );
    }

    // Reuse token if it has more than 5 minutes (300 seconds) left before expiration
    if (cachedToken && cachedToken.expiresAt > Date.now() + 300000) {
        return cachedToken.accessToken;
    }

    const isSandbox = environment === "sandbox";
    const authUrl = isSandbox
        ? "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
        : "https://api.ebay.com/identity/v1/oauth2/token";

    const credentialsBase64 = Buffer.from(`${appId}:${certId}`).toString(
        "base64",
    );

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
        console.error("eBay OAuth authentication failed", {
            status: response.status,
            statusText: response.statusText,
        });
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
        // Calculate expiration epoch with a 5-second safety buffer
        expiresAt: Date.now() + (data.expires_in - 5) * 1000,
    };

    return cachedToken.accessToken;
}
