import {gql} from "@apollo/client";
import {MessageType} from "./chat.types";
import {MESSAGE_FRAGMENT} from "./chat.fragment";

export type UpdateMessage = {tracks: {update: MessageType}}
export type UpdateMessageInput = {
    id: string,
    message: string,
    isRead: boolean
}
export type UpdateMessageInputType = {MessageData: UpdateMessageInput}

export const MESSAGE_UPDATE_MUTATION = gql`
    ${MESSAGE_FRAGMENT}
    mutation UpdateMessage($MessageData: TrackUpdateInputType!){
        chat{
            update(messageInput: $MessageData){
                ...MessageFragment
            }
        }
    }
`