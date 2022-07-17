import {gql} from '@apollo/client';
import {SETTINGS_FRAGMENT} from "./settings.fragments";
import {Settings} from "./settings.types";

export type SettingsGetData = { settings: { get: Settings } }
export type SettingsGetVars = {  }
export const SETTINGS_GET_QUERY = gql`
    ${SETTINGS_FRAGMENT}
    query SettingsGet {
        settings {
            get {
                ...SettingsFragment
            }
        }
    }
`;