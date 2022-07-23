import {ValueOf} from "../../../store/store";
import {Settings} from "../graphQL/settings.types";
import {
    SettingsApplicationUpdateInputType, SettingsEmailUpdateInputType,
    SettingsEmploymentUpdateInputType,
    SettingsTasksUpdateInputType
} from "../graphQL/settings.mutations";

export const prefix = 'SETTINGS_';

export const settingsActions = {
    setSettings: (settings?: Settings) => ({
        type: `${prefix}SET_SETTINGS`,
        payload: settings,
    } as const),
    getForAdministratorOrHavePermissionUpdateAsync: () => ({
        type: `${prefix}GET_FOR_ADMINISTRATOR_OR_HAVE_PERMISSION_UPDATE`,
    } as const),
    getForUnAuthenticatedAsync: () => ({
        type: `${prefix}GET_FOR_UN_AUTHENTICATED_ASYNC`,
    } as const),
    getForEmployee: () => ({
        type: `${prefix}GET_FOR_EMPLOYEE_ASYNC`,
    } as const),
    setLoadingGet: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_GET`,
        payload: loading
    } as const),

    updateEmploymentAsync: (settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType) => ({
        type: `${prefix}UPDATE_EMPLOYMENT_ASYNC`,
        payload: settingsEmploymentUpdateInputType
    } as const),
    updateApplicationAsync: (settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType) => ({
        type: `${prefix}UPDATE_APPLICATION_ASYNC`,
        payload: settingsApplicationUpdateInputType
    } as const),
    updateTasksAsync: (settingsTasksUpdateInputType: SettingsTasksUpdateInputType) => ({
        type: `${prefix}UPDATE_TASKS_ASYNC`,
        payload: settingsTasksUpdateInputType
    } as const),
    updateEmailAsync: (settingsEmailUpdateInputType: SettingsEmailUpdateInputType) => ({
        type: `${prefix}UPDATE_EMAIL_ASYNC`,
        payload: settingsEmailUpdateInputType
    } as const),
    setLoadingUpdate: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_UPDATE`,
        payload: loading
    } as const),
};

export type SettingsActionCreatorTypes = ValueOf<typeof settingsActions>;
export type SettingsActionTypes = ReturnType<SettingsActionCreatorTypes>;
