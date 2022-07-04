import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "./auth/auth.reducer";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {authEpics} from "./auth/auth.epics";

const epicMiddleware = createEpicMiddleware();

export const store = createStore(combineReducers({
    auth: authReducer,
}), composeWithDevTools(applyMiddleware(epicMiddleware)));

// @ts-ignore
const rootEpic = combineEpics(authEpics);
// @ts-ignore
epicMiddleware.run(rootEpic);

export type ValueOf<T> = T[keyof T]
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch