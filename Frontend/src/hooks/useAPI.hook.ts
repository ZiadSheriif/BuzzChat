import { useState } from "react";

type Config<T> = {
    onSuccess: (data: T) => void;
    onError: (error: unknown) => void;
};

const noop = () => { };
const defaultConfig: Config<unknown> = {
    onSuccess: noop,
    onError: noop,
};

type State<T> = {
    data: T | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string;
};

const useAPI = <T>(config: Config<T> = defaultConfig) => {
    const [state, setState] = useState<State<T>>({
        data: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: "",
    });
    const { onSuccess, onError } = config;

    const runQuery = (fn: () => Promise<T>) => {
        if (!fn) return;
        console.log("Running query");
        setState((s) => ({ ...s, isLoading: true }));
        fn()
            .then((data) => {
                setState({
                    data,
                    isLoading: false,
                    isSuccess: true,
                    isError: false,
                    error: "",
                });
                onSuccess(data);
            })
            .catch((error) => {
                setState({
                    data: null,
                    isLoading: false,
                    isSuccess: false,
                    isError: true,
                    error: error.message || "Failed to fetch",
                });
                onError(error);
            });
    };


    return { ...state, runQuery };
};

export default useAPI;