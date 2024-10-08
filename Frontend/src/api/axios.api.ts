import axios from 'axios';

export const baseURL = 'http://localhost:4000';


const API = axios.create({
    baseURL,
    headers: {
        'ngrok-skip-browser-warning': '69420',
        "Content-Language": "en-US",
        "Content-Type": "application/json",
    }
});

export const baseAPI = async (configObj: {
    method: string;
    url: string;
    requestConfig?: Record<string, unknown>;
}) => {
    const { method, url, requestConfig = {} } = configObj;
    const ctrl = new AbortController();

    const res = await API({
        method,
        url,
        ...requestConfig,
        signal: ctrl.signal
    });
    return res.data;
};