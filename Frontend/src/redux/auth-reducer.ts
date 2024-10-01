import { UserState, UserAction } from './types';
import {LOGIN, LOGOUT} from './auth-actions';

// Initial state for the auth reducer
const initialState: UserState = {
    id: null,
    email: null,
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
