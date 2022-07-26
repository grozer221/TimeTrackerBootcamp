import {gql} from "@apollo/client";
import {TRACK_FRAGMENT} from "./tracks.fragments";
import {Track} from "./tracks.types";

export type CreateTrackData = { tracks: {create: Track} }
export type CreateTrackInput = {
    title: string,
    description: string | null
}
export type CreateTrackInputType = { TrackData: CreateTrackInput}

export const TRACK_CREATE_MUTATION = gql`
    ${TRACK_FRAGMENT}
    mutation CreateTask ( $TrackData: TrackInputType!)  {
        tracks{
            create(trackInput: $TrackData) {
                ...TrackFragment    
            }
        }
    }    
`