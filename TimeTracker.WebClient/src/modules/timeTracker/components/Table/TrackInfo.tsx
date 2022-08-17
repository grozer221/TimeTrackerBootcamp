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

export const TrackInfo: FC<Props> = ({track}) => {


    return (
        <div className={s.table_row}>
            <div className={s.cell} style={{width: '30%'}}>
                <TrackTitle track={track}/>
            </div>
            <div className={s.divider}/>
            <div className={s.cell} style={{width: '20%'}}>
                <TrackKindInfo track={track}/>
            </div>
            <div className={s.divider}/>
            <div className={s.cell} style={{width: '20%'}}>
                <TrackStartTime track={track}/>
            </div>
            <div className={s.divider}/>
            <div className={s.cell} style={{width: '20%'}}>
                <TrackEndTime track={track}/>
            </div>
            <div className={s.divider}/>
            <div className={s.cell} style={{width: '10%'}}>
                <TrackTools track={track}/>
            </div>
        </div>
    )
}