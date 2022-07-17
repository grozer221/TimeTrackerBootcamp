import {Reducer} from "redux";
import {UsersActionTypes} from "./auth.actions";
import {User} from "../../users/graphQL/users.types";

type InitialState = {
    authedUser?: User | null,
    isAuth: boolean
}

const initialState: InitialState = {
    authedUser: null,
    isAuth: false
}

export const authReducer: Reducer<InitialState, UsersActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'SET_AUTHED_USER':
            if (action.payload.token) {
                localStorage.setItem('TOKEN', action.payload.token);
            } else {
                localStorage.removeItem('TOKEN')
            }
            return {...state, authedUser: action.payload.user, isAuth: !!action.payload.user};
        default:
            return state;
    }
}