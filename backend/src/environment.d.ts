declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ALLOWED_ORIGIN?: string;
            NODE_ENV: "development" | "production";
            EBAY_APP_ID?: string;
            EBAY_CERT_ID?: string;
            EBAY_DEV_ID?: string;
            EBAY_ENVIRONMENT?: "sandbox" | "production";
        }
    }
}

export {};
