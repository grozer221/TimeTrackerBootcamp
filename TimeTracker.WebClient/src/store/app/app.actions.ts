import {ValueOf} from "../store";

export const prefix = 'APP_';

export const appActions = {
    setInitialised: (initialised: boolean) => ({
        type: `${prefix}SET_INITIALISED`,
        payload: initialised,
    } as const),
};

export type AppActionCreatorTypes = ValueOf<typeof appActions>;
export type AppActionTypes = ReturnType<AppActionCreatorTypes>;
