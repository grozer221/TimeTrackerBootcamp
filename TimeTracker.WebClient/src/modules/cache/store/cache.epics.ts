import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, map, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {cacheActions} from "./cache.actions";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {CACHE_REFRESH_APP_MUTATION, CacheRefreshAppData, CacheRefreshAppVars} from "../graphQL/cache.mutations";

export const cacheClearAppEpic: Epic<ReturnType<typeof cacheActions.refreshAppAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CACHE_REFRESH_APP_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CacheRefreshAppData, CacheRefreshAppVars>({
                mutation: CACHE_REFRESH_APP_MUTATION,
            })).pipe(
                map(response => notificationsActions.addSuccess('Cache app successfully cleared')),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(cacheActions.setLoadingClearApp(true)),
                endWith(cacheActions.setLoadingClearApp(false)),
            )
        )
    );

export const cacheEpics = combineEpics(
    cacheClearAppEpic,
)