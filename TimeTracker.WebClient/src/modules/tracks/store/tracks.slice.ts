import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Track} from "../graphQL/tracks.types";
import {CreateTrackInput} from "../graphQL/tracks.mutations";

type InitialState = {
    tracks: Track[],
    total: number,
    pageSize: number
}

const initialState: InitialState = {
    tracks: [],
    total: 0,
    pageSize: 10
}

export  const  tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        getAsync: (state, action: PayloadAction<{ like: string, take: number, skip: number }>) => state,
        addTracks: (state, action: PayloadAction<Track[]>) =>{
            state.tracks = action.payload
        },
        updateTracksMetrics: (state, action: PayloadAction<{total: number, pageSize: number}>) => {
            state.total = action.payload.total
            state.pageSize = action.payload.pageSize
        },
        createTrack: (state, action: PayloadAction<CreateTrackInput>) => state
    }
})

export const tracksAction = tracksSlice.actions
export const tracksReducer = tracksSlice.reducer