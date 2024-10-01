import { baseAPI } from 'src/api/axios.api';

export const login = async (email: string, password: string) => {
    return await baseAPI({
        method: 'POST',
        url: '/api/users/login',
        requestConfig: { data: { email, password } }
    });
};

export const signup = async (username: string, email: string, password: string, image: string) => {
    const dataObj = { username: username, email: email, password: password, image: image };

    return await baseAPI({
        method: 'POST',
        url: '/api/users/signup',
        requestConfig: { data: dataObj }
    });
}