import {combineEpics, Epic, ofType} from "redux-observable";
import {usersActions} from "./users.slice";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {
    GET_USER_BY_EMAIL_QUERY,
    GetUserByEmailInputType,
    GetUserByEmailResponseType,
} from "../graphQL/users.queries";
import {notificationsActions} from "../../notifications/store/notifications.slice";
import {
    GET_TRACKS_BY_USER_ID_AND_DATE,
    GetTracksByUserIdAndDateInputType,
    GetTracksByUserIdAndDateResponseType
} from "../../tracks/graphQL/tracks.queries";
import {tracksAction} from "../../tracks/store/tracks.slice";
import {
    CreateTrackForOtherUserInput, CreateTrackForOtherUserInputType, CreateTrackForOtherUserResponseType,
    TRACK_CREATE_FOR_OTHER_USER_MUTATION
} from "../../tracks/graphQL/tracks.mutations";
import {navigateActions} from "../../navigate/store/navigate.slice";


export const getUserByEmailEpic: Epic<ReturnType<typeof usersActions.getUserByEmailAsync>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(usersActions.getUserByEmailAsync.type),
        mergeMap(action =>
            from(client.query<GetUserByEmailResponseType, GetUserByEmailInputType>({
                query: GET_USER_BY_EMAIL_QUERY,
                variables: {
                    UserEmail: action.payload
                }
            })).pipe(
                mergeMap(response => [
                    usersActions.setUserProfile(response.data.users.getByEmail)
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(usersActions.setCRUDLoading(true)),
                endWith(usersActions.setCRUDLoading(false)),
            )
        )
    )
}

export const getTracksByUserIdAndDateEpic: Epic<ReturnType<typeof usersActions.getTracksByUserIdAndDate>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(usersActions.getTracksByUserIdAndDate.type),
        mergeMap(action =>
            from(client.query<GetTracksByUserIdAndDateResponseType, GetTracksByUserIdAndDateInputType>({
                query: GET_TRACKS_BY_USER_ID_AND_DATE,
                variables: {
                    UserId: action.payload.UserId,
                    Date: action.payload.Date
                }
            })).pipe(
                mergeMap(response => [
                    usersActions.setUserTracks(response.data.tracks.getTracksByUserIdAndDate)
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(usersActions.setUserTracksLoading(true)),
                endWith(usersActions.setUserTracksLoading(false)),
            )
        )
    )
}

export const createTrackForUserEpic: Epic<ReturnType<typeof tracksAction.createTrackForOtherUser>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(tracksAction.createTrackForOtherUser.type),
        mergeMap(action =>
            from(client.mutate<CreateTrackForOtherUserResponseType, CreateTrackForOtherUserInputType>({
                mutation: TRACK_CREATE_FOR_OTHER_USER_MUTATION,
                variables: {TrackData: action.payload}
            })).pipe(
                mergeMap(response => [
                    notificationsActions.addSuccess("Track was created"),
                    usersActions.getTracksByUserIdAndDate({UserId: response.data?.tracks.createOther.userId as string,
                        Date: new Date().toISOString()}),
                    navigateActions.navigate(-1),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(usersActions.setUserTracksCreating(true)),
                endWith(usersActions.setUserTracksCreating(false)),
            )
        )
    )
}

export const usersProfilePageEpics = combineEpics(
    getUserByEmailEpic,
    // @ts-ignore
    getTracksByUserIdAndDateEpic,
    createTrackForUserEpic,
)
