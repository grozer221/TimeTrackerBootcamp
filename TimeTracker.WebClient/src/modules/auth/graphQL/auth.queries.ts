import {User} from "../../users/graphQL/users.types";
import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";
import {Settings} from "../../settings/graphQL/settings.types";

export type AuthMeData = {
    auth: { me: { token: string, user: User } },
    settings: { get: Settings },
}
export type AuthMeDate = {}
export const AUTH_ME_GET_QUERY = gql`
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
