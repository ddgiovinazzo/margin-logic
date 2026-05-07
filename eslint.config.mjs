import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default tseslint.config(
    {
        // Global ignores for your specific project structure
        ignores: ["**/node_modules/", "**/dist/", "**/.aws-sam/", "frontend/dist/"]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        plugins: {
            "@stylistic": stylistic,
            "prettier": prettier
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        rules: {
            // 1. Rebecca Vest Extension / Prettier Integration
            // This handles the "long import" wrapping and styled-components formatting
            "prettier/prettier": ["error", {
                "printWidth": 80,
                "tabWidth": 4,
                "singleQuote": false,
                "semi": true,
                "trailingComma": "all"
            }],

            // 2. Core Stylistic Rules (Synced with Prettier)
            "@stylistic/indent": ["error", 4, { 
                "SwitchCase": 1,
                // Crucial: Stops Stylistic from fighting Prettier inside styled-components
                "ignoredNodes": [
                    "TemplateLiteral *",
                    "TaggedTemplateExpression *"
                ]
            }],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/arrow-spacing": ["error", { "before": true, "after": true }],
            "@stylistic/eol-last": ["error", "always"],
            "@stylistic/no-trailing-spaces": "error",
            
            // 3. Logic & Types
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
        }
    },
    // 4. Collision Avoidance
    // This must be last to disable any native ESLint rules that conflict with Prettier
    configPrettier
);