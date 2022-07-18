import {User} from "../../users/graphQL/users.types";
import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";

export type AuthMeData = { auth: { me: { token: string, user: User } } }
export type AuthMeVars = {}
export const AUTH_ME_QUERY = gql`
    ${USER_FRAGMENT}
    query AuthMeGet {
        auth {
            me {
                token
                user {
                    ...UserFragment
                }
            }
        }
    }
`;
