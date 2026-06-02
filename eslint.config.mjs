import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import configPrettier from "eslint-config-prettier";

export default tseslint.config(
    {
        // Global ignores for your specific project structure
        ignores: [
            "**/node_modules/",
            "**/dist/",
            "**/.aws-sam/",
            "frontend/dist/",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            // Logic & Types Only
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
    // Collision Avoidance (Disables ESLint rules that conflict with Prettier)
    configPrettier,
);
