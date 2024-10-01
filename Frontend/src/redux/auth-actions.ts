import { Dispatch } from 'redux';
import { UserState } from './types';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginUser = (user: UserState) => (dispatch: Dispatch) => {
    dispatch({ type: LOGIN, payload: user });
};


export const logoutUser = () => (dispatch: Dispatch) => {
    dispatch({ type: LOGOUT });
};