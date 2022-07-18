import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, map, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {settingsActions} from "./settings.actions";
import {
    SETTINGS_GET_FOR_ADMINISTRATOR_OR_HAVE_PERMISSION_UPDATE_QUERY,
    SETTINGS_GET_FOR_EMPLOYEE_QUERY,
    SETTINGS_GET_FOR_UN_AUTHENTICATED_QUERY,
    SettingsGetData,
    SettingsGetVars
} from "../graphQL/settings.queries";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {
    SETTINGS_APPLICATION_UPDATE_MUTATION,
    SETTINGS_EMPLOYMENT_UPDATE_MUTATION,
    SETTINGS_TASKS_UPDATE_MUTATION,
    SettingsApplicationUpdateData,
    SettingsApplicationUpdateVars,
    SettingsEmploymentUpdateData,
    SettingsEmploymentUpdateVars,
    SettingsTasksUpdateData,
    SettingsTasksUpdateVars
} from "../graphQL/settings.mutations";

export const getForAdministratorOrHavePermissionUpdateEpic: Epic<ReturnType<typeof settingsActions.getForAdministratorOrHavePermissionUpdateAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_GET_FOR_ADMINISTRATOR_OR_HAVE_PERMISSION_UPDATE'),
        mergeMap(action =>
            from(client.query<SettingsGetData, SettingsGetVars>({
                query: SETTINGS_GET_FOR_ADMINISTRATOR_OR_HAVE_PERMISSION_UPDATE_QUERY,
            })).pipe(
                map(response => settingsActions.setSettings(response.data.settings.get)),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingGet(true)),
                endWith(settingsActions.setLoadingGet(false)),
            )
        )
    );

export const getSettingsForUnAuthenticatedEpic: Epic<ReturnType<typeof settingsActions.getForUnAuthenticatedAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_GET_FOR_UN_AUTHENTICATED_ASYNC'),
        mergeMap(action =>
            from(client.query<SettingsGetData, SettingsGetVars>({
                query: SETTINGS_GET_FOR_UN_AUTHENTICATED_QUERY,
            })).pipe(
                map(response => settingsActions.setSettings(response.data.settings.get)),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingGet(true)),
                endWith(settingsActions.setLoadingGet(false)),
            )
        )
    );

export const getSettingsForEmployeeEpic: Epic<ReturnType<typeof settingsActions.getForEmployee>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_GET_FOR_EMPLOYEE_ASYNC'),
        mergeMap(action =>
            from(client.query<SettingsGetData, SettingsGetVars>({
                query: SETTINGS_GET_FOR_EMPLOYEE_QUERY,
            })).pipe(
                map(response => settingsActions.setSettings(response.data.settings.get)),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingGet(true)),
                endWith(settingsActions.setLoadingGet(false)),
            )
        )
    );

export const settingsEmploymentUpdateEpic: Epic<ReturnType<typeof settingsActions.updateEmploymentAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_UPDATE_EMPLOYMENT_ASYNC'),
        mergeMap(action =>
            from(client.mutate<SettingsEmploymentUpdateData, SettingsEmploymentUpdateVars>({
                mutation: SETTINGS_EMPLOYMENT_UPDATE_MUTATION,
                variables: {settingsEmploymentUpdateInputType: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            settingsActions.setSettings(response.data.settings.updateEmployment),
                            notificationsActions.addSuccess('Settings common successfully updated')
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingUpdate(true)),
                endWith(settingsActions.setLoadingUpdate(false)),
            )
        )
    );

export const settingsApplicationUpdateEpic: Epic<ReturnType<typeof settingsActions.updateApplicationAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_UPDATE_APPLICATION_ASYNC'),
        mergeMap(action =>
            from(client.mutate<SettingsApplicationUpdateData, SettingsApplicationUpdateVars>({
                mutation: SETTINGS_APPLICATION_UPDATE_MUTATION,
                variables: {settingsApplicationUpdateInputType: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            settingsActions.setSettings(response.data.settings.updateApplication),
                            notificationsActions.addSuccess('Settings application successfully updated')
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingUpdate(true)),
                endWith(settingsActions.setLoadingUpdate(false)),
            )
        )
    );

export const settingsTasksUpdateEpic: Epic<ReturnType<typeof settingsActions.updateTasksAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_UPDATE_TASKS_ASYNC'),
        mergeMap(action =>
            from(client.mutate<SettingsTasksUpdateData, SettingsTasksUpdateVars>({
                mutation: SETTINGS_TASKS_UPDATE_MUTATION,
                variables: {settingsTasksUpdateInputType: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            settingsActions.setSettings(response.data.settings.updateTasks),
                            notificationsActions.addSuccess('Settings application successfully updated')
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingUpdate(true)),
                endWith(settingsActions.setLoadingUpdate(false)),
            )
        )
    );


export const settingsEpics = combineEpics(
    getForAdministratorOrHavePermissionUpdateEpic,
    // @ts-ignore
    getSettingsForUnAuthenticatedEpic,
    getSettingsForEmployeeEpic,
    settingsEmploymentUpdateEpic,
    settingsApplicationUpdateEpic,
    settingsTasksUpdateEpic,
)