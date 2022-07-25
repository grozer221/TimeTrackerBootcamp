import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Settings} from "../graphQL/settings.types";
import {
    SettingsApplicationUpdateInputType,
    SettingsEmailUpdateInputType,
    SettingsEmploymentUpdateInputType,
    SettingsTasksUpdateInputType
} from "../graphQL/settings.mutations";

type InitialState = {
    settings?: Settings | null,
    loadingGet: boolean,
    loadingUpdate: boolean,
}

const initialState: InitialState = {
    settings: null,
    loadingGet: false,
    loadingUpdate: false,
}


export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Settings | undefined>) => {
            state.settings = action.payload;
        },
        getForAdministratorOrHavePermissionUpdateAsync: (state, action: PayloadAction) => state,
        getForUnAuthenticatedAsync: (state, action: PayloadAction) => state,
        getForEmployee: (state, action: PayloadAction) => state,
        setLoadingGet: (state, action: PayloadAction<boolean>) => {
            state.loadingGet = action.payload
        },
        updateEmploymentAsync: (state, action: PayloadAction<SettingsEmploymentUpdateInputType>) => state,
        updateApplicationAsync: (state, action: PayloadAction<SettingsApplicationUpdateInputType>) => state,
        updateTasksAsync: (state, action: PayloadAction<SettingsTasksUpdateInputType>) => state,
        updateEmailAsync: (state, action: PayloadAction<SettingsEmailUpdateInputType>) => state,
        setLoadingUpdate: (state, action: PayloadAction<boolean>) => {
            state.loadingUpdate = action.payload;
        },
    },
})

export const settingsActions = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
