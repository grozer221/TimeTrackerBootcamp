import {gql} from "@apollo/client";

export const SETTINGS_COMMON_FRAGMENT = gql`
    fragment SettingsCommonFragment on SettingsCommonType {
        fullTimeHoursInWorkday
    }
`

export const SETTINGS_FRAGMENT = gql`
    ${SETTINGS_COMMON_FRAGMENT}
    fragment SettingsFragment on SettingsType {
        id
        common {
            ...SettingsCommonFragment
        }
        createdAt
        updatedAt
    }
`