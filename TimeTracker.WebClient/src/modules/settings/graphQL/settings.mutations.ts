import {gql} from '@apollo/client';
import {SETTINGS_FRAGMENT} from "./settings.fragments";
import {Settings} from "./settings.types";

export type SettingsCommonUpdateData = { settings: { updateCommon: Settings } }
export type SettingsCommonUpdateVars = { settingsCommonUpdateInputType: SettingsCommonUpdateInputType }
export type SettingsCommonUpdateInputType = {
    fullTimeHoursInWorkday: number,
}
export const SETTINGS_COMMON_UPDATE_MUTATION = gql`
    ${SETTINGS_FRAGMENT}
    mutation SettingsUpdateCommon($settingsCommonUpdateInputType: SettingsCommonUpdateInputType!){
        settings {
            updateCommon(settingsCommonUpdateInputType: $settingsCommonUpdateInputType) {
                ...SettingsFragment
            }
        }
    }

`;