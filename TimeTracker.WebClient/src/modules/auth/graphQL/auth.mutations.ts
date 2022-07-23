import {User} from "../../users/graphQL/users.types";
import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";

export type AuthLoginData = { auth: { login: { token: string, user: User } } }
export type AuthLoginInputType = { email: string, password: string }
export type AuthLoginVars = { authLoginInputType: AuthLoginInputType }


export const AUTH_LOG_IN_MUTATION = gql`
    ${USER_FRAGMENT}
    mutation AuthLogin($authLoginInputType: AuthLoginInputType!) {
        auth {
            login(authLoginInputType: $authLoginInputType) {
                token
                user {
                    ...UserFragment
                }
            }
        }
    }
`;

export const AUTH_LOG_OUT_MUTATION = gql`
    mutation AuthLogout {
        auth {
            logout
        }
    }
`;

export type AuthRequestResetData = {auth: {requestResetPassword: boolean}}
export type AuthRequestResetPasswordInputType = {email: string}
export type AuthRequestResetVars = {authRequestResetPasswordInputType: AuthRequestResetPasswordInputType}

export const AUTH_REQUEST_RESET_PASSWORD_MUTATION = gql`
    mutation AuthRequestReset($authRequestResetPasswordInputType: AuthRequestResetPasswordInputType!) {
     auth{
      requestResetPassword(authRequestResetPasswordInputType: $authRequestResetPasswordInputType)
    } 
    }
`;

export type AuthResetData = {auth: {resetPassword: boolean}}
export type AuthResetPasswordInputType = {password: string, token: string}
export type AuthResetVars = {authResetPasswordInputType: AuthResetPasswordInputType}

export const AUTH_RESET_PASSWORD_MUTATION = gql`
    mutation AuthReset($authResetPasswordInputType: AuthResetPasswordInputType!) {
        auth{
            resetPassword(authResetPasswordInputType: $authResetPasswordInputType)
        }
    }
`;