import {gql} from "@apollo/client";
import {TRACK_FRAGMENT} from "./tracks.fragments";
import {Track} from "./tracks.types";
import {TrackKind} from "../../../graphQL/enums/TrackKind";

export type CreateTrackData = { tracks: {create: Track} }
export type CreateTrackInput = {
    title: string,
    kind: TrackKind | TrackKind.Default
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