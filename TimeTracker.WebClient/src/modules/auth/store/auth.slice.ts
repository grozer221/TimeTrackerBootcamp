import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "../../users/graphQL/users.types";
import {
    AuthChangePasswordInputType,
    AuthLoginInputType,
    AuthRequestResetPasswordInputType,
    AuthResetPasswordInputType
} from "../graphQL/auth.mutations";
import {removeJwtToken, setJwtToken} from "../../../utils/localStorageUtils";

export type InitialState = {
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoginAsync: (state, action: PayloadAction<AuthLoginInputType>) => state,
        userLoginGoogleAsync: (state, action: PayloadAction<String>) => state,
        meAsync: (state, action: PayloadAction) => state,
        setLoadingMe: (state, action: PayloadAction<boolean>) => {
            state.loadingMe = action.payload;
        },
        setAuthedUser: (state, action: PayloadAction<{ user?: User | null, token?: string | null }>) => {
            if (action.payload.token)
                setJwtToken(action.payload.token)
            else
                removeJwtToken();
            state.authedUser = action.payload.user;
            state.isAuth = !!action.payload.user;
        },
        logoutAsync: (state, action: PayloadAction) => state,
        requestResetPasswordAsync: (state, action: PayloadAction<AuthRequestResetPasswordInputType>) => state,
        resetPasswordAsync: (state, action: PayloadAction<AuthResetPasswordInputType>) => state,
        changePasswordAsync: (state, action: PayloadAction<AuthChangePasswordInputType>) => state,
        setLoadingChangePassword: (state, action: PayloadAction<boolean>) => {
            state.loadingChangePassword = action.payload;
        },
    },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
