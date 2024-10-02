import { UserState, UserAction } from './types';
import { LOGIN, LOGOUT, GUEST } from './auth-actions';

const initialState: UserState = {
    userId: null,
    email: null,
    username: null,
    isLogged: false,
    image: null,
    token: null,
};

const loadUserFromLocalStorage = (): UserState => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialState;
};

const authReducer = (state = loadUserFromLocalStorage(), action: UserAction): UserState => {
    switch (action.type) {
        case LOGIN: {
            const updatedLoginState = {
                ...state,
                ...action.payload,
                isLogged: true,
            };
            localStorage.setItem('user', JSON.stringify(updatedLoginState));
            return updatedLoginState;
        }

        case GUEST: {
            const updatedGuestState = {
                ...state,
                isLogged: false,
                token: null,
                email: null,
            };
            localStorage.setItem('user', JSON.stringify(updatedGuestState));
            return updatedGuestState;
        }

        case LOGOUT: {
            localStorage.removeItem('user');
            return {
                ...initialState,
            };
        }

        default:
            return state;
    }
};

export default authReducer;
