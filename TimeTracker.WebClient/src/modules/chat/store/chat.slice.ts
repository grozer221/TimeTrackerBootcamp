import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../users/graphQL/users.types";
import {MessageType} from "../graphQL/chat.types";
import {usersSlice} from "../../users/store/users.slice";


type InitialState = {
    messages: MessageType[]
}

const initialState : InitialState = {
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createMessage(state, action: PayloadAction<MessageType>){
            state.messages.push(action.payload)
        }
    }});

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer