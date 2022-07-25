import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from "../modules/app/store/app.slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../modules/auth/store/auth.slice";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {authEpics} from "../modules/auth/store/auth.epics";
import {calendarDaysEpics} from "../modules/calendarDays/store/calendarDays.epics";
import {settingsEpics} from "../modules/settings/store/settings.epics";
import {fileManagerEpics} from "../modules/fileManager/store/fileManager.epics";
import {calendarDaysReducer} from "../modules/calendarDays/store/calendarDays.slice";
import {navigateReducer} from "../modules/navigate/store/navigate.slice";
import {notificationsReducer} from "../modules/notifications/store/notifications.slice";
import {settingsReducer} from "../modules/settings/store/settings.slice";
import {usersPageEpics} from "../modules/users/store/usersPage.epics";
import {cacheEpics} from "../modules/cache/store/cache.epics";
import {cacheReducer} from "../modules/cache/store/cache.slice";
import {fileManagerReducer} from "../modules/fileManager/store/fileManager.slice";
import {usersReducer} from "../modules/users/store/users.slice";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        calendarDays: calendarDaysReducer,
        notifications: notificationsReducer,
        navigate: navigateReducer,
        settings: settingsReducer,
        cache: cacheReducer,
        fileManager: fileManagerReducer,
        users: usersReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(epicMiddleware),
    devTools: true,
})

const rootEpic = combineEpics(
    authEpics,
    // @ts-ignore
    calendarDaysEpics,
    settingsEpics,
    cacheEpics,
    usersPageEpics,
    fileManagerEpics,
);
// @ts-ignore
epicMiddleware.run(rootEpic);


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector