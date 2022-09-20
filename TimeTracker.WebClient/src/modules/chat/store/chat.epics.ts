import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {notificationsActions} from "../../notifications/store/notifications.slice";
import {chatActions} from "./chat.slice";
import {GET_DIALOG, GET_MESSAGES, GetDialogData, GetDialogInputType, GetMessagesData} from "../graphQL/chat.queries";
import {tracksAction} from "../../timeTracker/store/tracks.slice";
import {TRACK_UPDATE_MUTATION, UpdateTrack, UpdateTrackInputType} from "../../timeTracker/graphQL/tracks.mutations";
import {
    MESSAGE_UPDATE_MUTATION,
    UpdateMessage,
    UpdateMessageInput,
    UpdateMessageInputType
} from "../graphQL/chat.mutation";

export const getChatDialog: Epic<ReturnType<typeof chatActions.getChatDialog>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(chatActions.getChatDialog.type),
        mergeMap(action =>
            from(client.query<GetDialogData, GetDialogInputType>({
                query: GET_DIALOG,
                variables: {
                    user1: action.payload.user1,
                    user2: action.payload.user2
                }
            })).pipe(
                mergeMap(response => [
                    chatActions.addChatDialog(response.data.chat.getDialog),

                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(chatActions.setLoadingGet(true)),
                endWith(chatActions.setLoadingGet(false)),
            )
        )
    )
}

export const getMessages: Epic<ReturnType<typeof chatActions.getMessages>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(chatActions.getMessages.type),
        mergeMap(action =>
            from(client.query<GetMessagesData, void>({
                query: GET_MESSAGES
            })).pipe(
                mergeMap(response => [
                    chatActions.addMessages(response.data.chat.get),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(chatActions.setLoadingGet(true)),
                endWith(chatActions.setLoadingGet(false)),
            )
        )
    )
}

export const updateMessage: Epic<ReturnType<typeof chatActions.updateMessage>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType(chatActions.updateMessage.type),
        mergeMap(action =>
            from(client.mutate<UpdateMessage, UpdateMessageInputType>({
                mutation: MESSAGE_UPDATE_MUTATION,
                variables: {
                    MessageData: action.payload
                }
            })).pipe(
                mergeMap(response => {
                    return []
                })
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}


export const chatEpics = combineEpics(
    getChatDialog,
    // @ts-ignore
    getMessages,
)

