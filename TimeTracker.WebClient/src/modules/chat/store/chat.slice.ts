import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../users/graphQL/users.types";
import {MessageType} from "../graphQL/chat.types";
import {usersSlice} from "../../users/store/users.slice";
import {GetStatisticInputType} from "../../timeTracker/userStatistic/graphQL/statistic.queries";
import {GetDialogData, GetDialogInputType} from "../graphQL/chat.queries";
import {GetTracksByUserIdAndDateInputType} from "../../timeTracker/graphQL/tracks.queries";
import {Statistic} from "../../timeTracker/userStatistic/graphQL/statistic.type";
import {UpdateTrackInput} from "../../timeTracker/graphQL/tracks.mutations";
import {UpdateMessageInput} from "../graphQL/chat.mutation";


type InitialState = {
    messages: MessageType[],
    dialog:  MessageType[],
    getDialogInputType: GetDialogInputType,
    loadingGet: boolean
}

const initialState : InitialState = {
    messages: [],
    dialog:  [],
    getDialogInputType: {
        user1: '',
        user2: ''
    },
    loadingGet: false
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getChatDialog: (state, action: PayloadAction<GetDialogInputType>) => state,
        getMessages: (state, action: PayloadAction<void>) => state,
        addChatDialog: (state, action: PayloadAction<MessageType[]>) =>{
            state.dialog = action.payload
        },
        addMessages: (state, action: PayloadAction<MessageType[]>) =>{
            state.messages = action.payload
        },
        createMessage(state, action: PayloadAction<MessageType>){
            state.dialog.push(action.payload)
        },
        setGetChatDialogInputData: (state, action: PayloadAction<GetDialogInputType>) => {
            state.getDialogInputType = action.payload
        },
        updateMessage: (state, action: PayloadAction<UpdateMessageInput>) => state,
        setLoadingGet: (state, action: PayloadAction<boolean>) => {
            state.loadingGet = action.payload
        },

    }});

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer