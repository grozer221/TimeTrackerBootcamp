import React, {FC} from 'react';
import {Track} from "../../../tracks/graphQL/tracks.types";
import {TrackTitle} from "../Table/TrackTitle";
import {TrackKindInfo} from "../Table/TrackKindInfo";
import {TrackStartTime} from "../Table/TrackStartTime";
import {TrackEndTime} from "../Table/TrackEndTime";
import {TrackTools} from "../Table/TrackTools";
import s from './/src/modules/timeTracker/components/Stopwatch/TrackerStopwatch.module.css'

type Props = {
    track: Track
}

export const CurrentTrackInfo: FC<Props> = ({track}) => {

    return (
        <>
            <div className={s.}>
                <TrackTitle track={track}/>
            </div>
            <div>
                <TrackKindInfo track={track}/>
            </div>
            <div>
                <TrackStartTime track={track}/>
            </div>
            <div>
                <TrackEndTime track={track}/>
            </div>
            <div>
                <TrackTools track={track}/>
            </div>
        </>
    )
}