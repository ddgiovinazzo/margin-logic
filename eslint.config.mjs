import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
    // 1. Global Ignores (Must be first)
    {
        ignores: ["**/node_modules/", "**/dist/", "**/.aws-sam/"]
    },

    // 2. Recommended Base
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. Custom Overrides
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },

        rules: {
            // Formatting Overrides
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            "eol-last": ["error", "always"],
            "object-curly-spacing": ["error", "always"],
            "arrow-spacing": ["error", { "before": true, "after": true }],
            "space-before-function-paren": ["error", "always"],

            // Avoid conflicts
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn"
        }
    }
);