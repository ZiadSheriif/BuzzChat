import { useState } from "react";

type useLocalStorageReturn = [string, (newValue: string) => void, () => void];

const useLocalStorage = (
    keyName: string,
    defaultValue: string
): useLocalStorageReturn => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return value;
            } else {
                window.localStorage.setItem(keyName, defaultValue);
                return defaultValue;
            }
        } catch {
            return defaultValue;
        }
    });
    const setValue = (newValue: string) => {
        try {
            window.localStorage.setItem(keyName, newValue);
        } catch {
            console.error("Error in setting the value for the Item ", keyName);
        }
        setStoredValue(newValue);
    };

    const clearValue = () => {
        try {
            window.localStorage.removeItem(keyName);
        } catch {
            console.error("Error in removing the value for the Item ", keyName);
        }
        setStoredValue(defaultValue);
    };
    return [storedValue, setValue, clearValue];
};

export default useLocalStorage;