import { baseAPI } from 'src/api/axios.api';

export const login = async (email: string, password: string) => {
    console.log("email", email, "password", password);
    console.log("baseAPI", baseAPI);
    return await baseAPI({
        method: 'POST',
        url: '/api/users/login',
        requestConfig: { data: { email, password } }
    });
};