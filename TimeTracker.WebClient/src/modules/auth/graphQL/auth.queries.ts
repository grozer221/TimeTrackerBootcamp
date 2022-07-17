import {User} from "../../users/graphQL/users.types";
import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";
import {Settings} from "../../settings/graphQL/settings.types";
import {SETTINGS_FRAGMENT} from "../../settings/graphQL/settings.fragments";


export type AuthMeData = {
    auth: { me: { token: string, user: User } },
    settings: { get: Settings },
}
export type AuthMeDate = {}
export const AUTH_ME_AND_SETTINGS_GET_QUERY = gql`
    ${USER_FRAGMENT}
    ${SETTINGS_FRAGMENT}
    query AuthMeAndSettingsGet {
        auth {
            me {
                token
                user {
                    ...UserFragment
                }
            }
        }
        settings {
            get {
                ...SettingsFragment
            }
        }
    }

`;
