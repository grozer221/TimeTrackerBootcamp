import {gql} from "@apollo/client";

export const TRACK_FRAGMENT = gql`
    fragment TrackFragment on TrackType {
        id
        userId
        title
        kind
        creation
        startTime
        endTime
        createdAt
        updatedAt
    }
`