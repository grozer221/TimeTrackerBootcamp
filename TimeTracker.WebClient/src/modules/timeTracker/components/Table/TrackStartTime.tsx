import React, {FC} from 'react';
import {CalendarOutlined} from '@ant-design/icons';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import moment from "moment";
import {Track} from "../../../tracks/graphQL/tracks.types";

type Props = {
    track: Track
}

export const TrackStartTime: FC<Props> = ({track}) => {
    const startTime = track.startTime
    const startTimeDate = new Date(startTime)
    const startTimeLabel = moment(startTimeDate).format('YYYY/MM/DD HH:mm:ss')

    return (
        <>
            <div className={s.cell} style={{width: '20%'}}>
                <CalendarOutlined className={s.icons}/>{startTimeLabel}
            </div>
            <div className={s.divider}/>
        </>
    )
}