import fs from "fs/promises";
import path from "path";

const USPS_CLIENT_ID = process.env.USPS_CLIENT_ID;
const USPS_CLIENT_SECRET = process.env.USPS_CLIENT_SECRET;
const API_BASE_URL = "https://api.usps.com/prices/v3/base-rates/search";

// Note: You may want to append the actual filename here later
const TARGET_FILE_PATH = path.resolve(process.cwd());

async function getUspsAccessToken() {
    const credentials = Buffer.from(
        `${USPS_CLIENT_ID}:${USPS_CLIENT_SECRET}`,
    ).toString("base64");

    const response = await fetch("https://api.usps.com/oauth2/v3/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ grant_type: "client_credentials" }),
    });

    if (!response.ok) throw new Error(`Auth failed: ${response.statusText}`);
    const data = await response.json();
    return data.access_token;
}
