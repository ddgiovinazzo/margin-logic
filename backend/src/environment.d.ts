declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ALLOWED_ORIGIN?: string;
            NODE_ENV: "development" | "production";
        }
    }
}

export {};
