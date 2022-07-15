import {User} from "../../graphQL/modules/users/users.types";
import {ValueOf} from "../store";
import {AuthLoginInputType} from "../../graphQL/modules/auth/auth.mutations";

export const authActions = {
    userLoginAsync: (credentials: AuthLoginInputType) => ({
        type: 'LOGIN_USER_ASYNC',
        payload: {credentials},
    } as const),
    meAsync: () => ({
        type: 'ME_ASYNC',
        payload: {},
    } as const),
    setAuthedUser: (user?: User | null, token?: string | null) => ({
        type: 'SET_AUTHED_USER',
        payload: {user, token},
    } as const),
    logOutAsync: () => ({
        type: 'LOG_OUT_ASYNC'
    } as const)
};

export type UsersActionCreatorTypes = ValueOf<typeof authActions>;
export type UsersActionTypes = ReturnType<UsersActionCreatorTypes>;
