/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/margin-logic/",
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
    },
});
