import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, map, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {settingsActions} from "./settings.actions";
import {SETTINGS_GET_QUERY, SettingsGetData, SettingsGetVars} from "../graphQL/settings.queries";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {
    SETTINGS_COMMON_UPDATE_MUTATION,
    SettingsCommonUpdateData,
    SettingsCommonUpdateVars
} from "../graphQL/settings.mutations";

export const settingsGetEpic: Epic<ReturnType<typeof settingsActions.getAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_GET_ASYNC'),
        mergeMap(action =>
            from(client.query<SettingsGetData, SettingsGetVars>({
                query: SETTINGS_GET_QUERY,
            })).pipe(
                map(response => settingsActions.setSettings(response.data.settings.get)),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(settingsActions.setLoadingGet(true)),
                endWith(settingsActions.setLoadingGet(false)),
            )
        )
    );

export const settingsCommonUpdateEpic: Epic<ReturnType<typeof settingsActions.updateCommonAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('SETTINGS_UPDATE_COMMON_ASYNC'),
        mergeMap(action =>
            from(client.mutate<SettingsCommonUpdateData, SettingsCommonUpdateVars>({
                mutation: SETTINGS_COMMON_UPDATE_MUTATION,
                variables: {settingsCommonUpdateInputType: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            settingsActions.setSettings(response.data.settings.updateCommon),
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


export const settingsEpics = combineEpics(
    settingsGetEpic,
    // @ts-ignore
    settingsCommonUpdateEpic,
)