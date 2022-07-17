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