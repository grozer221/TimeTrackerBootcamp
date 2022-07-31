import {TrackKind} from "../../../graphQL/enums/TrackKind";

export type Track = {
    id: string
    userId: string,
    title: string,
    kind: TrackKind,
    startTime: string,
    endTime: string,
    createdAt: string,
    updatedAt: string
}