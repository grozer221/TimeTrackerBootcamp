import {gql} from '@apollo/client';
import {MESSAGE_FRAGMENT} from "./chat.fragment";
import {MessageType} from "./chat.types";

export type GetDialogData = {chat: {getDialog: MessageType[]}}
export type GetDialogInputType = { user1: string, user2: string }

export const GET_DIALOG = gql`
    ${MESSAGE_FRAGMENT}
    query GetDialog($user1: Guid!, $user2: Guid!){
      chat{
        getDialog(user1: $user1, user2: $user2){
            ...MessageFragment
        }
      }
    }
`

export type GetMessagesData = {chat: {get: MessageType[]}}

export const GET_MESSAGES = gql`
    ${MESSAGE_FRAGMENT}
    query GetDialog{
      chat{
        get{
            ...MessageFragment
        }
      }
    }
`
