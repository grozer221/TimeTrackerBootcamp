import {gql} from '@apollo/client';
import {Track} from "./tracks.types";
import {TRACK_FRAGMENT} from "./tracks.fragments";

export type GetTracksData = { tracks: { get: { entities: Track[], total: number, pageSize: number } } }
export type GetTracksInputData = {
    like: string,
    take: number,
    skip: number
}


export const TRACKS_GET_QUERY = gql`
    ${TRACK_FRAGMENT}
    query GetTracks($like: String!, $take: Int!, $skip: Int! ) {
        tracks {
            get(like: $like, take: $take, skip: $skip) {
                entities {
                    ...TrackFragment
                },
                total,
                pageSize
            }
        }  
    }
`