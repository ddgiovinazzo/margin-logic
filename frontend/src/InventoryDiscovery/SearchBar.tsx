import { SubmitEvent, ChangeEvent, useState } from "react";

interface SearchBarProps {
    onSearchSubmit: (query: string) => void;
    isLoading: boolean;
}

export function SearchBar({ onSearchSubmit, isLoading }: SearchBarProps) {
    const [input, setInput] = useState("");

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.currentTarget.value);
    }

    function handleFormSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        onSearchSubmit(input.trim());
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                minLength={2}
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                name="SearchQuery"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
}
