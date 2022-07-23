import {User} from "../../users/graphQL/users.types";
import {ValueOf} from "../../../store/store";
import {
    AuthLoginInputType,
    AuthRequestResetPasswordInputType,
    AuthResetPasswordInputType
} from "../graphQL/auth.mutations";

export const authActions = {
    userLoginAsync: (credentials: AuthLoginInputType) => ({
        type: 'LOGIN_USER_ASYNC',
        payload: {credentials},
    } as const),
    meAsync: () => ({
        type: 'ME_ASYNC',
    } as const),
    setLoadingMe: (loading: boolean) => ({
        type: 'SET_LOADING_ME',
        payload: loading,
    } as const),
    setAuthedUser: (user?: User | null, token?: string | null) => ({
        type: 'SET_AUTHED_USER',
        payload: {user, token},
    } as const),
    logoutAsync: () => ({
        type: 'LOG_OUT_ASYNC'
    } as const),
    requestResetPasswordAsync: (authRequestResetPasswordInputType: AuthRequestResetPasswordInputType) => ({
        type: 'REQUEST_RESET_PASSWORD_ASYNC',
        payload: authRequestResetPasswordInputType
    } as const),
    resetPasswordAsync: (authResetPasswordInputType: AuthResetPasswordInputType) => ({
        type: 'RESET_PASSWORD_ASYNC',
        payload: authResetPasswordInputType
    } as const),
};

export type UsersActionCreatorTypes = ValueOf<typeof authActions>;
export type UsersActionTypes = ReturnType<UsersActionCreatorTypes>;
