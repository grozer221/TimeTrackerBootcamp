import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Notification = {
    text: string,
    type: 'Error' | 'Success' | 'Info' | 'Warning',
}

type InitialState = {
    notifications: Notification[],
}

const initialState: InitialState = {
    notifications: [],
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addSuccess: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications, {text: action.payload, type: "Success"}]
        },
        addError: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications, {text: action.payload, type: "Error"}]
        },
        addInfo: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications, {text: action.payload, type: "Info"}]
        },
        addWarning: (state, action: PayloadAction<string>) => {
            state.notifications = [...state.notifications, {text: action.payload, type: "Warning"}]
        },
        removeNotification: (state) => {
            state.notifications = [];
        },
    },
})

export const notificationsActions = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer
