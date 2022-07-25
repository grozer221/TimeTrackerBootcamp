import {User} from "../../users/graphQL/users.types";
import {ValueOf} from "../../../store/store";
import {
    AuthChangePasswordInputType,
    AuthLoginInputType,
    AuthRequestResetPasswordInputType,
    AuthResetPasswordInputType
} from "../graphQL/auth.mutations";

export const prefix = 'AUTH_';

export const authActions = {
    userLoginAsync: (credentials: AuthLoginInputType) => ({
        type: `${prefix}LOGIN_USER_ASYNC`,
        payload: {credentials},
    } as const),
    meAsync: () => ({
        type: `${prefix}ME_ASYNC`,
    } as const),
    setLoadingMe: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_ME`,
        payload: loading,
    } as const),
    setAuthedUser: (user?: User | null, token?: string | null) => ({
        type: `${prefix}SET_AUTHED_USER`,
        payload: {user, token},
    } as const),
    logoutAsync: () => ({
        type: `${prefix}LOG_OUT_ASYNC`
    } as const),
    requestResetPasswordAsync: (authRequestResetPasswordInputType: AuthRequestResetPasswordInputType) => ({
        type: `${prefix}REQUEST_RESET_PASSWORD_ASYNC`,
        payload: authRequestResetPasswordInputType
    } as const),
    resetPasswordAsync: (authResetPasswordInputType: AuthResetPasswordInputType) => ({
        type: `${prefix}RESET_PASSWORD_ASYNC`,
        payload: authResetPasswordInputType
    } as const),

    changePasswordAsync: (authChangePasswordInputType: AuthChangePasswordInputType) => ({
        type: `${prefix}CHANGE_PASSWORD_ASYNC`,
        payload: authChangePasswordInputType
    } as const),
    setLoadingChangePassword: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_CHANGE_PASSWORD`,
        payload: loading
    } as const),
};

export type UsersActionCreatorTypes = ValueOf<typeof authActions>;
export type UsersActionTypes = ReturnType<UsersActionCreatorTypes>;
