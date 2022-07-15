import {Reducer} from "redux";
import {NotificationsActionTypes} from "./notifications.actions";

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

export const notificationsReducer: Reducer<InitialState, NotificationsActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'NOTIFICATIONS_ADD_SUCCESS':
            return {...state, notifications: [...state.notifications, {text: action.payload, type: "Success"}]};
        case 'NOTIFICATIONS_ADD_ERROR':
            return {...state, notifications: [...state.notifications, {text: action.payload, type: "Error"}]};
        case 'NOTIFICATIONS_ADD_INFO':
            return {...state, notifications: [...state.notifications, {text: action.payload, type: "Info"}]};
        case 'NOTIFICATIONS_ADD_WARNING':
            return {...state, notifications: [...state.notifications, {text: action.payload, type: "Warning"}]};
        case 'NOTIFICATIONS_REMOVE_NOTIFICATION':
            return {...state, notifications: state.notifications.filter(n => n !== action.payload)};
        default:
            return state;
    }
}