import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../store";
import {catchError, from, map, mergeMap, of} from "rxjs";
import {authActions} from "./auth.actions";
import {client} from "../../graphQL/client";
import {
    AUTH_LOG_IN_MUTATION,
    AUTH_LOG_OUT_MUTATION,
    AuthLoginData,
    AuthLoginVars
} from "../../graphQL/modules/auth/auth.mutations";
import {ME_QUERY, MeData} from "../../graphQL/modules/auth/auth.query";
import {appActions} from "../app/app.actions";
import {navigateActions} from "../navigate/navigate.actions";
import {notificationsActions} from "../notifications/notifications.actions";

export const loginEpic: Epic<ReturnType<typeof authActions.userLoginAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOGIN_USER_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthLoginData, AuthLoginVars>({
                mutation: AUTH_LOG_IN_MUTATION,
                variables: {authLoginInputType: action.payload.credentials}
            })).pipe(
                mergeMap(response => [
                    authActions.setAuthedUser(response.data?.auth.login.user, response.data?.auth.login.token),
                    navigateActions.navigate(-1),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
            )
        )
    );

export const meEpic: Epic<ReturnType<typeof authActions.meAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('ME_ASYNC'),
        mergeMap(action =>
            from(client.query<MeData>({
                query: ME_QUERY,
            })).pipe(
                mergeMap(response => [
                    appActions.setInitialised(true),
                    authActions.setAuthedUser(response.data.auth.me.user, response.data.auth.me.token)
                ]),
                catchError(error => of(appActions.setInitialised(true))),
            )
        )
    );

export const logOutEpic: Epic<ReturnType<typeof authActions.logOutAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOG_OUT_ASYNC'),
        mergeMap(action =>
            from(client.mutate<MeData>({
                mutation: AUTH_LOG_OUT_MUTATION,
            })).pipe(
                map(response => {
                    if (!response.errors) {
                        return authActions.setAuthedUser(null, null)
                    }
                })
            )
        )
    );


// @ts-ignore
export const authEpics = combineEpics(loginEpic, meEpic, logOutEpic)