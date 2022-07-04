import {Reducer} from "redux";
import {UsersActionTypes} from "./auth.actions";
import {User} from "../../graphQL/modules/users/users.types";

type InitialState = {
    authedUser: User | null,
    isAuth: boolean
}

const initialState = {
    authedUser: null,
    isAuth: false
}

export const authReducer: Reducer<InitialState, UsersActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'SET_AUTHED_USER':
            if (action.payload.token !== null){
                localStorage.setItem('TOKEN', action.payload.token);
            }
            else {
                localStorage.removeItem('TOKEN')
            }
            return {...state, authedUser: action.payload.user, isAuth: !!action.payload.user};
        default:
            return state;
    }
}