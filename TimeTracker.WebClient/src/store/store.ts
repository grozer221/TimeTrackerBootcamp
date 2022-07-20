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
import {settingsReducer} from "../modules/settings/store/settings.reducer";
import {settingsEpics} from "../modules/settings/store/settings.epics";
import {cacheReducer} from "../modules/cache/store/cache.reducer";
import {cacheEpics} from "../modules/cache/store/cache.epics";
import {filesReducer} from "../modules/files/store/files.reducer";
import {filesEpics} from "../modules/files/store/files.epics";

const epicMiddleware = createEpicMiddleware();

export const store = createStore(combineReducers({
    app: appReducer,
    auth: authReducer,
    calendarDays: calendarDaysReducer,
    notifications: notificationsReducer,
    navigate: navigateReducer,
    settings: settingsReducer,
    cache: cacheReducer,
    files: filesReducer,
}), composeWithDevTools(applyMiddleware(epicMiddleware)));

const rootEpic = combineEpics(
    authEpics,
    // @ts-ignore
    calendarDaysEpics,
    settingsEpics,
    cacheEpics,
    filesEpics,
);
// @ts-ignore
epicMiddleware.run(rootEpic);

export type ValueOf<T> = T[keyof T]
export type RootState = ReturnType<typeof store.getState>;
export type UseAppDispatch = typeof store.dispatch