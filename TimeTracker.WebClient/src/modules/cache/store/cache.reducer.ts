import {Reducer} from "redux";
import {CacheActionTypes} from "./cache.actions";

type InitialState = {
    loadingRefreshApp: boolean,
}

const initialState: InitialState = {
    loadingRefreshApp: false,
}

export const cacheReducer: Reducer<InitialState, CacheActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'CACHE_SET_LOADING_CLEAR_APP':
            return {...state, loadingRefreshApp: action.payload};
        default:
            return state;
    }
}