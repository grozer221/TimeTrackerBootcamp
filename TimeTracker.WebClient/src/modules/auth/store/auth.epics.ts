import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, mergeMap, of, startWith} from "rxjs";
import {authActions} from "./auth.actions";
import {client} from "../../../graphQL/client";
import {AUTH_LOG_IN_MUTATION, AUTH_LOG_OUT_MUTATION, AuthLoginData, AuthLoginVars} from "../graphQL/auth.mutations";
import {AUTH_ME_QUERY, AuthMeData, AuthMeVars} from "../graphQL/auth.queries";
import {appActions} from "../../app/store/app.actions";
import {navigateActions} from "../../navigate/store/navigate.actions";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {settingsActions} from "../../settings/store/settings.actions";
import {Role} from "../../../graphQL/enums/Role";
import {Permission} from "../../../graphQL/enums/Permission";

const getSettingsAction = (role?: Role, permissions?: Permission[]) => {
    if (!role && !permissions)
        return settingsActions.getForUnAuthenticatedAsync();
    if (role === Role.Administrator || permissions?.some(p => p === Permission.UpdateSettings))
        return settingsActions.getForAdministratorOrHavePermissionUpdateAsync();
    return settingsActions.getForEmployee();
}

export const loginEpic: Epic<ReturnType<typeof authActions.userLoginAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOGIN_USER_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthLoginData, AuthLoginVars>({
                mutation: AUTH_LOG_IN_MUTATION,
                variables: {authLoginInputType: action.payload.credentials}
            })).pipe(
                mergeMap(response => [
                    settingsActions.getForAdministratorOrHavePermissionUpdateAsync(),
                    authActions.setAuthedUser(response.data?.auth.login.user, response.data?.auth.login.token),
                    navigateActions.navigate(-2),
                    getSettingsAction(response.data?.auth.login.user.role, response.data?.auth.login.user.permissions),
                ]),
                catchError(error => {
                    console.log('login error', error)
                    return of(notificationsActions.addError(error.message))
                }),
            )
        )
    );

export const meEpic: Epic<ReturnType<typeof authActions.meAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('ME_ASYNC'),
        mergeMap(action =>
            from(client.query<AuthMeData, AuthMeVars>({
                query: AUTH_ME_QUERY,
            })).pipe(
                mergeMap(response => [
                    appActions.setInitialised(true),
                    authActions.setAuthedUser(response.data.auth.me.user, response.data.auth.me.token),
                    getSettingsAction(response.data?.auth.me.user.role, response.data?.auth.me.user.permissions),
                ]),
                catchError(error => of(
                    appActions.setInitialised(true),
                    getSettingsAction(),
                )),
                startWith(authActions.setLoadingMe(true)),
                endWith(authActions.setLoadingMe(false)),
            )
        )
    );

export const logoutEpic: Epic<ReturnType<typeof authActions.logoutAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOG_OUT_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthMeData>({
                mutation: AUTH_LOG_OUT_MUTATION,
            })).pipe(
                mergeMap(response => [
                    authActions.setAuthedUser(null, null),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
            )
        )
    );

// @ts-ignore
export const authEpics = combineEpics(loginEpic, meEpic, logoutEpic)