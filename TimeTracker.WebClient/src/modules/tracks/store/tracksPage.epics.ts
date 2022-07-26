import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, debounceTime, from, mergeMap, of} from "rxjs";
import {client} from "../../../graphQL/client";
import {TRACKS_GET_QUERY, GetTracksData, GetTracksInputData} from "../graphQL/tracks.queries";
import {
    CreateTrackData,
    CreateTrackInput,
    CreateTrackInputType,
    TRACK_CREATE_MUTATION
} from "../graphQL/tracks.mutations";
import {tracksAction} from "./tracks.slice";
import {notificationsActions} from "../../notifications/store/notifications.slice";

export const getTracksEpic: Epic<ReturnType<typeof tracksAction.getAsync>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(tracksAction.getAsync.type),
        mergeMap(action=>
            from(client.query<GetTracksData, GetTracksInputData>({
                query: TRACKS_GET_QUERY,
                variables: {
                    like: action.payload.like,
                    skip: action.payload.skip,
                    take: action.payload.take
                }
            })).pipe(
                mergeMap(response => [
                    tracksAction.addTracks(response.data.tracks.get.entities),
                    tracksAction.updateTracksMetrics({
                        total: response.data.tracks.get.total,
                        pageSize: response.data.tracks.get.pageSize
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
            from(client.mutate<CreateTrackData, CreateTrackInputType>({
                mutation: TRACK_CREATE_MUTATION,
                variables: {
                    TrackData: action.payload
                }
            })).pipe(
                mergeMap(response=>[
                    notificationsActions.addSuccess("Track created!")
            ])
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}

export const tracksPageEpics = combineEpics(
    getTracksEpic,
    // @ts-ignore
    createTrackEpic
)