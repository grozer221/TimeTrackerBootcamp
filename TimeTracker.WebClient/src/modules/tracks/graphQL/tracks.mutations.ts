import {gql} from "@apollo/client";
import {TRACK_FRAGMENT} from "./tracks.fragments";
import {Track} from "./tracks.types";
import {TrackKind} from "../../../graphQL/enums/TrackKind";

export type CreateTrack = { tracks: {create: Track} }
export type CreateTrackInput = {
    title: string,
    kind: TrackKind | TrackKind.Default
}
export type CreateTrackInputType = { TrackData: CreateTrackInput}

export const TRACK_CREATE_MUTATION = gql`
    ${TRACK_FRAGMENT}
    mutation CreateTrack ( $TrackData: TrackInputType!)  {
        tracks{
            create(trackInput: $TrackData) {
                ...TrackFragment    
            }
        }
    }    
`

export type RemoveTrack = { tracks: {remove: string}}
export type RemoveTrackInput = {
    id: string
}
export type RemoveTrackInputType = { TrackData: RemoveTrackInput}

export const TRACK_REMOVE_NUTATION = gql`
    mutation RemoveTask($TrackData: TrackRemoveInputType!){
      tracks{
        remove(trackInput: $TrackData)
      }
    }
`