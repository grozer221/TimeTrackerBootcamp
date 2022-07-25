import {Reducer} from "redux";
import {UsersActionTypes} from "./auth.actions";
import {User} from "../../users/graphQL/users.types";
import {removeJwtToken, setJwtToken} from "../../../utils/localStorageUtils";

type InitialState = {
    authedUser?: User | null,
    isAuth: boolean,
    loadingMe: boolean,
    loadingChangePassword: boolean,
}

const initialState: InitialState = {
    authedUser: null,
    isAuth: false,
    loadingMe: false,
    loadingChangePassword: false,
}

export const authReducer: Reducer<InitialState, UsersActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'AUTH_SET_AUTHED_USER':
            if (action.payload.token) {
                setJwtToken(action.payload.token)
            } else {
                removeJwtToken();
            }
            return {...state, authedUser: action.payload.user, isAuth: !!action.payload.user};
        case 'AUTH_SET_LOADING_ME':
            return {...state, loadingMe: action.payload}

        case 'AUTH_SET_LOADING_CHANGE_PASSWORD':
            return {...state, loadingChangePassword: action.payload}
        default:
            return state;
    }
}