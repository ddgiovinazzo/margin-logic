import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import React from "react";
import "@testing-library/jest-dom";

describe("SearchBar Component", () => {
    it("should render search input and submit button", () => {
        render(<SearchBar onSearchSubmit={() => {}} isLoading={false} />);

        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /search/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it("should update input value on typing", () => {
        render(<SearchBar onSearchSubmit={() => {}} isLoading={false} />);

        const input = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "vintage leather" } });

        expect(input.value).toBe("vintage leather");
    });

    it("should call onSearchSubmit with trimmed query on form submit", () => {
        const onSearchSubmitMock = vi.fn();
        render(
            <SearchBar onSearchSubmit={onSearchSubmitMock} isLoading={false} />,
        );

        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /search/i });

        fireEvent.change(input, { target: { value: "  iphone 13  " } });
        fireEvent.click(button);

        expect(onSearchSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSearchSubmitMock).toHaveBeenCalledWith("iphone 13");
    });

    it("should disable input and button when isLoading is true", () => {
        render(<SearchBar onSearchSubmit={() => {}} isLoading={true} />);

        const input = screen.getByRole("textbox");
        const button = screen.getByRole("button", { name: /search/i });

        expect(input).toBeDisabled();
        expect(button).toBeDisabled();
    });
});
