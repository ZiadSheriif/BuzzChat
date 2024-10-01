export type UserState = {
    id: string | null;
    email: string | null;
    isLogged: boolean;
    image: string | null;
    token: string | null;
};


export type UserAction = {
    type: string;
    payload?: UserState;
};


export interface RootState {
    auth: UserState;
}



