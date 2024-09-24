type UserState = {
    id: string | null,
    email: string | null,
    isLogged: boolean,
    image: string | null,
    token: string | null,
};


type UserAction = {
    type: string,
    payload: UserState,
};


const initialState: UserState = { id: null, email: null, isLogged: false, image: null, token: null };


const authReducer = (state = initialState, action: UserAction): UserState => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                isLogged: action.payload.isLogged,
                image: action.payload.image,
                token: action.payload.token,
            };
        case 'GUEST':
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                isLogged: true,
                image: action.payload.image,
                token: null,
            };
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
}


export default authReducer;