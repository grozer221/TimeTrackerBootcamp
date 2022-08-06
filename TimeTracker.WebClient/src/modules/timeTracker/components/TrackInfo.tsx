import React, {FC} from 'react';
import s from '../pages/TrackerPage/TrackerPage.module.css'
import {Track} from "../../tracks/graphQL/tracks.types";
import {TrackTitle} from "./TrackTitle";
import {TrackKindInfo} from "./TrackKindInfo";
import {TrackStartTime} from "./TrackStartTime";
import {TrackEndTime} from "./TrackEndTime";
import {TrackRemove} from "./TrackRemove";

type Props = {
    track: Track
}

export const TrackInfo: FC<Props> = ({track}) =>{
    return(
        <div className={s.table_row}>
            <TrackTitle title={track.title}/>
            <TrackKindInfo kind={track.kind}/>
            <TrackStartTime startTime={track.startTime}/>
            <TrackEndTime endTime={track.endTime}/>
            <TrackRemove id={track.id}/>
        </div>
    )
}