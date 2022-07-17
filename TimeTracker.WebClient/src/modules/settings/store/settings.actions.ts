import {ValueOf} from "../../../store/store";
import { SettingsCommonUpdateInputType } from "../graphQL/settings.mutations";
import {Settings} from "../graphQL/settings.types";

export const prefix = 'SETTINGS_';

export const settingsActions = {
    setSettings: (settings: Settings) => ({
        type: `${prefix}SET_SETTINGS`,
        payload: settings,
    } as const),
    getAsync: () => ({
        type: `${prefix}GET_ASYNC`,
    } as const),
    setLoadingGet: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_GET`,
        payload: loading
    } as const),

    updateCommonAsync: (settingsCommonUpdateInputType: SettingsCommonUpdateInputType) => ({
        type: `${prefix}UPDATE_COMMON_ASYNC`,
        payload: settingsCommonUpdateInputType
    } as const),
    setLoadingUpdate: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_UPDATE`,
        payload: loading
    } as const),
};

export type SettingsActionCreatorTypes = ValueOf<typeof settingsActions>;
export type SettingsActionTypes = ReturnType<SettingsActionCreatorTypes>;
