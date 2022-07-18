import {ValueOf} from "../../../store/store";

export const prefix = 'CACHE_';

export const cacheActions = {
    refreshAppAsync: () => ({
        type: `${prefix}REFRESH_APP_ASYNC`,
    } as const),
    setLoadingClearApp: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_CLEAR_APP`,
        payload: loading,
    } as const),
};

export type CacheActionCreatorTypes = ValueOf<typeof cacheActions>;
export type CacheActionTypes = ReturnType<CacheActionCreatorTypes>;
