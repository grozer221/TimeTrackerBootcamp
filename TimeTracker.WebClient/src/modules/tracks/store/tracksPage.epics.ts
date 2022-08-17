import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, map, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {
    GetCurrentTrackData,
    GetTracksData,
    GetTracksInputData,
    TRACKS_GET_CURRENT_QUERY,
    TRACKS_GET_QUERY
} from "../graphQL/tracks.queries";
import {
    CreateTrack,
    CreateTrackInputType,
    RemoveTrack,
    RemoveTrackInputType,
    TRACK_CREATE_MUTATION,
    TRACK_REMOVE_MUTATION,
    TRACK_UPDATE_MUTATION,
    UpdateTrack,
    UpdateTrackInputType
} from "../graphQL/tracks.mutations";
import {tracksAction} from "./tracks.slice";
import {notificationsActions} from "../../notifications/store/notifications.slice";
import {calendarDaysActions} from "../../calendarDays/store/calendarDays.slice";

export const getTracksEpic: Epic<ReturnType<typeof tracksAction.getAsync>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(tracksAction.getAsync.type),
        mergeMap(action=>
            from(client.query<GetTracksData, GetTracksInputData>({
                query: TRACKS_GET_QUERY,
                variables: {
                    like: action.payload.like,
                    pageNumber: action.payload.pageNumber,
                    pageSize: action.payload.pageSize,
                    kind: action.payload.kind
                }
            })).pipe(
                mergeMap(response => [
                    tracksAction.addTracks(response.data.tracks.getUserTracks.entities),
                    tracksAction.setGetTracksInputData(action.payload),
                    tracksAction.updateTracksMetrics({
                        total: response.data.tracks.getUserTracks.total,
                        pageSize: response.data.tracks.getUserTracks.pageSize,
                        trackKind: response.data.tracks.getUserTracks.trackKind
                    })
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(tracksAction.setLoadingGet(true)),
                endWith(tracksAction.setLoadingGet(false))
            )
        ),
    )
}

export const createTrackEpic: Epic<ReturnType<typeof tracksAction.createTrack>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(tracksAction.createTrack.type),
        mergeMap(action =>
            from(client.mutate<CreateTrack, CreateTrackInputType>({
                mutation: TRACK_CREATE_MUTATION,
                variables: {
                    TrackData: action.payload
                }
            })).pipe(
                mergeMap(response=>{
                    const tracksInputData = state$.value.tracks.getTracksInputData
                    return [
                        tracksInputData && tracksAction.getAsync(tracksInputData),
                        tracksAction.getCurrentAsync(),
                        notificationsActions.addSuccess("Track created!")
                    ]
                })
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),

    )
}

export const removeTrackEpic: Epic<ReturnType<typeof tracksAction.removeTrack>, any, RootState> = (action$, state$) =>{
    return action$.pipe(
        ofType(tracksAction.removeTrack.type),
        mergeMap(action =>
            from(client.mutate<RemoveTrack, RemoveTrackInputType>({
                mutation: TRACK_REMOVE_MUTATION,
                variables: {
                    TrackData: action.payload
                }
            })).pipe(
                mergeMap(response=>{
                    const tracksInputData = state$.value.tracks.getTracksInputData
                    return [
                        tracksInputData && tracksAction.getAsync(tracksInputData),
                        tracksAction.getCurrentAsync(),
                        notificationsActions.addWarning('Track removed')
                    ]
                })
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}

export const updateTrackEpic: Epic<ReturnType<typeof tracksAction.updateTrack>, any, RootState> = (action$, state$) =>{
    return action$.pipe(
        ofType(tracksAction.updateTrack.type),
        mergeMap(action =>
            from(client.mutate<UpdateTrack, UpdateTrackInputType>({
                mutation: TRACK_UPDATE_MUTATION,
                variables: {
                    TrackData: action.payload
                }
            })).pipe(
                mergeMap(response=>{
                    const tracksInputData = state$.value.tracks.getTracksInputData
                    return [
                        tracksInputData && tracksAction.getAsync(tracksInputData),
                        tracksAction.getCurrentAsync(),
                        notificationsActions.addInfo("Track update!")
                    ]
                })
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}

export const getCurrentTrackEpic: Epic<ReturnType<typeof tracksAction.getCurrentAsync>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(tracksAction.getCurrentAsync.type),
        mergeMap(action=>
            from(client.query<GetCurrentTrackData>({
                query: TRACKS_GET_CURRENT_QUERY
            })).pipe(
                map(response => tracksAction.setCurrentTrack(response.data?.tracks.getCurrentTrack)),
                catchError(error => of(notificationsActions.addError(error.message))),
            )
        ),
    )
}

export const tracksPageEpics = combineEpics(
    getTracksEpic,
    // @ts-ignore
    createTrackEpic,
    removeTrackEpic,
    updateTrackEpic,
    getCurrentTrackEpic,
)