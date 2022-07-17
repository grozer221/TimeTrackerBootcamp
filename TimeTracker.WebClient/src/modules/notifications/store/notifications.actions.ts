import {ValueOf} from "../../../store/store";
import {Notification} from './notifications.reducer';

export const prefix = 'NOTIFICATIONS_';

export const notificationsActions = {
    addSuccess: (text: string) => ({
        type: `${prefix}ADD_SUCCESS`,
        payload: text,
    } as const),
    addError: (text: string) => ({
        type: `${prefix}ADD_ERROR`,
        payload: text,
    } as const),
    addInfo: (text: string) => ({
        type: `${prefix}ADD_INFO`,
        payload: text,
    } as const),
    addWarning: (text: string) => ({
        type: `${prefix}ADD_WARNING`,
        payload: text,
    } as const),
    removeNotification: (notification: Notification) => ({
        type: `${prefix}REMOVE_NOTIFICATION`,
        payload: notification,
    } as const),
};

export type NotificationsActionCreatorTypes = ValueOf<typeof notificationsActions>;
export type NotificationsActionTypes = ReturnType<NotificationsActionCreatorTypes>;
