import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "../../graphQL/tracks.types";
import {GetTracksByUserIdAndDateInputType, GetTracksInputData} from "../../graphQL/tracks.queries";
import {Statistic} from "../graphQL/statistic.type";
import {GetStatisticInputType} from "../graphQL/statistic.queries";
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {TrackCreation} from "../../../../graphQL/enums/TrackCreation";
import {
    CreateTrackForOtherUserInput,
    CreateTrackInput,
    RemoveTrackInput,
    UpdateTrackInput
} from "../../graphQL/tracks.mutations";

type InitialState = {
    statistic: Statistic,
    getStatisticInputData: GetStatisticInputType,
    loadingGet: boolean
}

const initialState: InitialState = {
    statistic: {
        id: "",
        createdAt: "",
        updatedAt: "",
        workerHours: 0,
        monthHours: 160
    },
    getStatisticInputData: {
        UserId: "",
        Date: ""
    },
    loadingGet: false
}

export  const  statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        getAsync: (state, action: PayloadAction<GetStatisticInputType>) => state,
        addStatistic: (state, action: PayloadAction<Statistic>) =>{
            state.statistic = action.payload
        },
        setLoadingGet: (state, action: PayloadAction<boolean>) => {
            state.loadingGet = action.payload
        },
        setGetStatisticInputData: (state, action: PayloadAction<GetTracksByUserIdAndDateInputType>) => {
            state.getStatisticInputData = action.payload
        },
    }

})

export const statisticAction = statisticSlice.actions
export const statisticReducer = statisticSlice.reducer