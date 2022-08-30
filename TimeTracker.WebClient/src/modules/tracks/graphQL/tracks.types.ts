import {TrackKind} from "../../../graphQL/enums/TrackKind";
import {TrackCreation} from "../../../graphQL/enums/TrackCreation";

export type Track = {
    id: string
    userId: string,
    title: string,
    kind: TrackKind,
    creation: TrackCreation,
    editedBy: string,
    startTime: string,
    endTime: string,
    createdAt: string,
    updatedAt: string
}