type UserState = {
    id: string | null;
    email: string | null;
    isLogged: boolean;
    image: string | null;
    token: string | null;
};

type UserAction = {
    type: string;
    payload?: UserState;
};

const initialState: UserState = { id: null, email: null, isLogged: false, image: null, token: null };

const authReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case 'LOGIN':
        case 'GUEST': {
            return {
                ...state,
                ...action.payload,
                isLogged: action.type === 'LOGIN' ? true : state.isLogged,
            };
        }
        case 'LOGOUT':
            return {
                ...state,
                id: null,
                email: null,
                isLogged: false,
                image: null,
                token: null,
            };
        default:
            return state;
    }
};

export default authReducer;