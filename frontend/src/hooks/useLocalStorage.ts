import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    // 1. Pass an initial state function to useState so this logic only executes once on mount
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            // Check if the key already exists in the browser's storage
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If the user has strict privacy settings or corrupted JSON, fallback gracefully
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // 2. Return a wrapped version of useState's setter function that also persists the new value
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have exactly the same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Update React state
            setStoredValue(valueToStore);

            // Update browser storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue] as const;
}
