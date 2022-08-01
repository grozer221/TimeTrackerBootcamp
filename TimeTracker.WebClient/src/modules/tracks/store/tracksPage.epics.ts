import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, debounceTime, from, mergeMap, of} from "rxjs";
import {client} from "../../../graphQL/client";
import {TRACKS_GET_QUERY, GetTracksData, GetTracksInputData} from "../graphQL/tracks.queries";
import {
    CreateTrack,
    CreateTrackInput,
    CreateTrackInputType,
    RemoveTrack,
    RemoveTrackInputType,
    TRACK_CREATE_MUTATION,
    TRACK_REMOVE_MUTATION, TRACK_UPDATE_MUTATION, UpdateTrack, UpdateTrackInputType
} from "../graphQL/tracks.mutations";
import {tracksAction} from "./tracks.slice";
import {notificationsActions} from "../../notifications/store/notifications.slice";
import {navigateActions} from "../../navigate/store/navigate.slice";

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
                    tracksAction.addTracks(response.data.tracks.get.entities),
                    tracksAction.setGetTracksInputData(action.payload),
                    tracksAction.updateTracksMetrics({
                        total: response.data.tracks.get.total,
                        pageSize: response.data.tracks.get.pageSize,
                        trackKind: response.data.tracks.get.trackKind
                    })
                ])
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message)))
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
                        notificationsActions.addWarning("Track deleted!")
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
                        notificationsActions.addInfo("Track updated!")
                    ]
                })
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}

export const tracksPageEpics = combineEpics(
    getTracksEpic,
    // @ts-ignore
    createTrackEpic,
    removeTrackEpic,
    updateTrackEpic
)