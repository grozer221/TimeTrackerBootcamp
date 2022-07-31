import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "../graphQL/tracks.types";
import {CreateTrackInput, RemoveTrackInput} from "../graphQL/tracks.mutations";
import {GetTracksInputData} from "../graphQL/tracks.queries";

type InitialState = {
    tracks: Track[],
    total: number,
    pageSize: number,
    trackKind: string,
    getTracksInputData: GetTracksInputData | null
}

const initialState: InitialState = {
    tracks: [],
    total: 0,
    pageSize: 10,
    trackKind: "",
    getTracksInputData: null
}

export  const  tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        getAsync: (state, action: PayloadAction<GetTracksInputData>) => state,
        addTracks: (state, action: PayloadAction<Track[]>) =>{
            state.tracks = action.payload
        },
        updateTracksMetrics: (state, action: PayloadAction<{total: number, pageSize: number, trackKind: string}>) => {
            state.total = action.payload.total
            state.pageSize = action.payload.pageSize
        },
        createTrack: (state, action: PayloadAction<CreateTrackInput>) => state,
        removeTrack: (state, action: PayloadAction<RemoveTrackInput>) => state,
        setGetTracksInputData: (state, action: PayloadAction<GetTracksInputData>) => {
            state.getTracksInputData = action.payload
        }
    }

})

export const tracksAction = tracksSlice.actions
export const tracksReducer = tracksSlice.reducer