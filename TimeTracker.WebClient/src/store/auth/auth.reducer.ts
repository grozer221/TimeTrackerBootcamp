import {Reducer} from "redux";
import {UsersActionTypes} from "./auth.actions";
import {User} from "../../graphQL/modules/users/users.types";

type InitialState = {
    authedUser: User | null,
}

const initialState = {
    authedUser: null,
}

export const authReducer: Reducer<InitialState, UsersActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'SET_AUTHED_USER':
            localStorage.setItem('TOKEN', action.payload.token);
            return {...state, authedUser: action.payload.user};
        default:
            return state;
    }
}