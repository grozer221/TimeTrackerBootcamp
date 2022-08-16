import {gql} from '@apollo/client';
import {Track} from "./tracks.types";
import {TRACK_FRAGMENT} from "./tracks.fragments";
import {TrackKind} from "../../../graphQL/enums/TrackKind";

export type GetTracksData = { tracks: { getUserTracks: { entities: Track[], total: number, pageSize: number, trackKind: string } } }
export type GetTracksInputData = {
    like: string,
    pageSize: number,
    pageNumber: number,
    kind: TrackKind
}


export const TRACKS_GET_QUERY = gql`
    ${TRACK_FRAGMENT}
    query GetUserTracks($like: String!, $pageSize: Int!, $pageNumber: Int!, $kind: TrackKind) {
        tracks {
            getUserTracks(like: $like, pageSize: $pageSize, pageNumber: $pageNumber, kind: $kind) {
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

export type GetCurrentTrackData = { tracks: { getCurrentTrack:  Track}  }

export const TRACKS_GET_CURRENT_QUERY = gql`
    ${TRACK_FRAGMENT}
    query GetCurrentTrack {
        tracks {
            getCurrentTrack {
                ...TrackFragment
            }
        }
    }
`