import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "../modules/auth/store/auth.reducer";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {authEpics} from "../modules/auth/store/auth.epics";
import {calendarDaysReducer} from "../modules/calendarDays/store/calendarDays.reducer";
import {calendarDaysEpics} from "../modules/calendarDays/store/calendarDays.epics";
import {notificationsReducer} from "../modules/notifications/store/notifications.reducer";
import {navigateReducer} from "../modules/navigate/store/navigate.reducer";
import {appReducer} from "../modules/app/store/app.reducer";

const epicMiddleware = createEpicMiddleware();

export const store = createStore(combineReducers({
    app: appReducer,
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