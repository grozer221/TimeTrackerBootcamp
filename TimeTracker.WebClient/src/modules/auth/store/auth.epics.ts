import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, from, map, mergeMap, of} from "rxjs";
import {authActions} from "./auth.actions";
import {client} from "../../../graphQL/client";
import {AUTH_LOG_IN_MUTATION, AUTH_LOG_OUT_MUTATION, AuthLoginData, AuthLoginVars} from "../graphQL/auth.mutations";
import {AUTH_ME_AND_SETTINGS_GET_QUERY, AuthMeData} from "../graphQL/auth.queries";
import {appActions} from "../../app/store/app.actions";
import {navigateActions} from "../../navigate/store/navigate.actions";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {settingsActions} from "../../settings/store/settings.actions";

export const loginEpic: Epic<ReturnType<typeof authActions.userLoginAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOGIN_USER_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthLoginData, AuthLoginVars>({
                mutation: AUTH_LOG_IN_MUTATION,
                variables: {authLoginInputType: action.payload.credentials}
            })).pipe(
                mergeMap(response => [
                    settingsActions.getAsync(),
                    authActions.setAuthedUser(response.data?.auth.login.user, response.data?.auth.login.token),
                    navigateActions.navigate(-2),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
            )
        )
    );

export const meEpic: Epic<ReturnType<typeof authActions.meAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('ME_ASYNC'),
        mergeMap(action =>
            from(client.query<AuthMeData>({
                query: AUTH_ME_AND_SETTINGS_GET_QUERY,
            })).pipe(
                mergeMap(response => [
                    appActions.setInitialised(true),
                    authActions.setAuthedUser(response.data.auth.me.user, response.data.auth.me.token),
                    settingsActions.setSettings(response.data.settings.get),
                ]),
                catchError(error => of(appActions.setInitialised(true))),
            )
        )
    );

export const logOutEpic: Epic<ReturnType<typeof authActions.logOutAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOG_OUT_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthMeData>({
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