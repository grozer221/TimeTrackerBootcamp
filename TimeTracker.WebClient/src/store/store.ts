import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./auth/auth.reducer";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {authEpics} from "./auth/auth.epics";
import {calendarDaysReducer} from "./calendarDays/calendarDays.reducer";
import {calendarDaysEpics} from "./calendarDays/calendarDays.epics";
import {notificationsReducer} from "./notifications/notifications.reducer";
import {navigateReducer} from "./navigate/navigate.reducer";

const epicMiddleware = createEpicMiddleware();

export const store = createStore(combineReducers({
    auth: authReducer,
    calendarDays: calendarDaysReducer,
    notifications: notificationsReducer,
    navigate: navigateReducer,
}), composeWithDevTools(applyMiddleware(epicMiddleware)));

// @ts-ignore
const rootEpic = combineEpics(authEpics, calendarDaysEpics);
// @ts-ignore
epicMiddleware.run(rootEpic);

export type ValueOf<T> = T[keyof T]
export type RootState = ReturnType<typeof store.getState>;
export type UseAppDispatch = typeof store.dispatch