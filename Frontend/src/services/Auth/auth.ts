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

export const signup = async (username: string, email: string, password: string, image: string) => {
    console.log("username", username, "email", email, "password", password, "image", image);
    return await baseAPI({
        method: 'POST',
        url: '/api/users/signup',
        requestConfig: { data: { username, email, password, image } }
    });
}