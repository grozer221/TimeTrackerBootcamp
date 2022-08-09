import React, {FC} from 'react';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import {Track} from "../../../tracks/graphQL/tracks.types";
import {TrackTitle} from "./TrackTitle";
import {TrackKindInfo} from "./TrackKindInfo";
import {TrackStartTime} from "./TrackStartTime";
import {TrackEndTime} from './TrackEndTime';
import {TrackTools} from "./TrackTools";

type Props = {
    track: Track
}

export const TrackInfo: FC<Props> = ({track}) =>{


    return(
        <div className={s.table_row}>
            <TrackTitle track={track}/>
            <TrackKindInfo track={track}/>
            <TrackStartTime track={track}/>
            <TrackEndTime  track={track}/>
            <TrackTools  track={track}/>
        </div>
    )
}