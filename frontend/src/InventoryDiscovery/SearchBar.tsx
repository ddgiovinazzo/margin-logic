import { SubmitEvent, ChangeEvent, useState } from "react";
import { PrimaryButton, PrimaryInput } from "../components/CoreUI";
import styled from "styled-components";

interface SearchBarProps {
    onSearchSubmit: (query: string) => void;
    isLoading: boolean;
}

const SearchForm = styled.form`
    display: flex;
    gap: 0.5rem;
    align-items: stretch;
    width: 100%;
`;

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
        <SearchForm onSubmit={handleFormSubmit}>
            <PrimaryInput
                type="text"
                minLength={2}
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                name="SearchQuery"
                required
            />
            <PrimaryButton type="submit">Search</PrimaryButton>
        </SearchForm>
    );
}
