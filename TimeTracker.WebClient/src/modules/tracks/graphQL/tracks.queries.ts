import {gql} from '@apollo/client';
import {Track} from "./tracks.types";
import {TRACK_FRAGMENT} from "./tracks.fragments";
import {TrackKind} from "../../../graphQL/enums/TrackKind";

export type GetTracksData = { tracks: { get: { entities: Track[], total: number, pageSize: number, trackKind: string } } }
export type GetTracksInputData = {
    like: string,
    pageSize: number,
    pageNumber: number,
    kind: TrackKind
}


export const TRACKS_GET_QUERY = gql`
    ${TRACK_FRAGMENT}
    query GetTracks($like: String!, $pageSize: Int!, $pageNumber: Int!, $kind: TrackKind) {
        tracks {
            get(like: $like, pageSize: $pageSize, pageNumber: $pageNumber, kind: $kind) {
                entities {
                    ...TrackFragment
                },
                total,
                pageSize,
                trackKind
            }
        }  
    }
`