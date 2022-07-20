import {gql} from '@apollo/client';
import {SETTINGS_FRAGMENT} from "./settings.fragments";
import {Settings} from "./settings.types";
import {DayOfWeek} from "../../../graphQL/enums/DayOfWeek";

export type SettingsEmploymentUpdateData = { settings: { updateEmployment: Settings } }
export type SettingsEmploymentUpdateVars = { settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType }
export type SettingsEmploymentUpdateInputType = {
    fullTimeHoursInWorkday: number,
    partTimeHoursInWorkday: number[]
}
export const SETTINGS_EMPLOYMENT_UPDATE_MUTATION = gql`
    ${SETTINGS_FRAGMENT}
    mutation SettingsUpdateEmployment($settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType!){
        settings {
            updateEmployment(settingsEmploymentUpdateInputType: $settingsEmploymentUpdateInputType) {
                ...SettingsFragment
            }
        }
    }
`;


export type SettingsApplicationUpdateData = { settings: { updateApplication: Settings } }
export type SettingsApplicationUpdateVars = { settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType }
export type SettingsApplicationUpdateInputType = {
    title?: string,
    faviconUrl?: string,
    logoUrl?: string,
}
export const SETTINGS_APPLICATION_UPDATE_MUTATION = gql`
    ${SETTINGS_FRAGMENT}
    mutation SettingsUpdateApplication($settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType!){
        settings {
            updateApplication(settingsApplicationUpdateInputType: $settingsApplicationUpdateInputType) {
                ...SettingsFragment
            }
        }
    }
`;

export type SettingsTasksUpdateData = { settings: { updateTasks: Settings } }
export type SettingsTasksUpdateVars = { settingsTasksUpdateInputType: SettingsTasksUpdateInputType }
export type SettingsTasksUpdateInputType = {
    autoSetWorkingHoursForFullTimers: string,
    autoCreateDaysOff: SettingsTasksUpdateInputType_AutoCreateDaysOff
}
export type SettingsTasksUpdateInputType_AutoCreateDaysOff = {
    isEnabled: boolean,
    dayOfWeekWhenCreate?: DayOfWeek,
    timeWhenCreate?: string,
    daysOfWeek?: DayOfWeek[],
}
export const SETTINGS_TASKS_UPDATE_MUTATION = gql`
    ${SETTINGS_FRAGMENT}
    mutation SettingsUpdateTasks($settingsTasksUpdateInputType: SettingsTasksUpdateInputType!){
        settings {
            updateTasks(settingsTasksUpdateInputType: $settingsTasksUpdateInputType) {
                ...SettingsFragment
            }
        }
    }
`;