import {Reducer} from "redux";
import {Settings} from "../graphQL/settings.types";
import {SettingsActionTypes} from "./settings.actions";

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

export const settingsReducer: Reducer<InitialState, SettingsActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'SETTINGS_SET_SETTINGS':
            return {...state, settings: action.payload};
        case 'SETTINGS_SET_LOADING_GET':
            return {...state, loadingGet: action.payload};
        case 'SETTINGS_SET_LOADING_UPDATE':
            return {...state, loadingUpdate: action.payload};
        default:
            return state;
    }
}