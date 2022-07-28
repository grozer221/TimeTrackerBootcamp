import {gql} from '@apollo/client';
import {Track} from "./tracks.types";
import {TRACK_FRAGMENT} from "./tracks.fragments";

export type GetTracksData = { tracks: { get: { entities: Track[], total: number, pageSize: number } } }
export type GetTracksInputData = {
    like: string,
    pageSize: number,
    pageNumber: number
}


export const TRACKS_GET_QUERY = gql`
    ${TRACK_FRAGMENT}
    query GetTracks($like: String!, $pageSize: Int!, $pageNumber: Int! ) {
        tracks {
            get(like: $like, pageSize: $pageSize, pageNumber: $pageNumber) {
                entities {
                    ...TrackFragment
                },
                total,
                pageSize
            }
        }  
    }
`