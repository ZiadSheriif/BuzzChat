import { useState } from "react";

type Config<T> = {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
};

type State<T> = {
    data: T | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string;
};

const defaultConfig = {
    onSuccess: () => { },
    onError: () => { },
};

const useAPI = <T>(config: Config<T> = defaultConfig) => {
    const [state, setState] = useState<State<T>>({
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: "",
    });

    const { onSuccess = () => { }, onError = () => { } } = config;

    const runQuery = async (fn: () => Promise<T>) => {
        try {
            setState((prev) => ({ ...prev, isLoading: true, isError: false, error: "" }));

            const data = await fn();
            setState({ data, isLoading: false, isSuccess: true, isError: false, error: "" });
            onSuccess(data);
        } catch (error: unknown) {
        console.log("error", error);
            const errorMessage = error instanceof Error ? error?.response?.data.message : "Failed to fetch";
            setState({ data: null, isLoading: false, isSuccess: false, isError: true, error: errorMessage });
            onError(error);
        }
    };

    return { ...state, runQuery };
};

export default useAPI;
