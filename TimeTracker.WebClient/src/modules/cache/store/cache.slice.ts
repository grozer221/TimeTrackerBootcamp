import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialState = {
    loadingRefreshApp: boolean,
}

const initialState: InitialState = {
    loadingRefreshApp: false,
}

export const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        refreshAppAsync: (state, action: PayloadAction) => state,
        setLoadingClearApp: (state, action: PayloadAction<boolean>) => {
            state.loadingRefreshApp = action.payload;
        },
    },
})

export const cacheActions = cacheSlice.actions
export const cacheReducer = cacheSlice.reducer
