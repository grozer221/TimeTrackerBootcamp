import React, {FC} from 'react';
import {CalendarOutlined, SyncOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import s from '../../pages/TrackerPage/TrackerPage.module.css'
import moment from "moment";
import {Track} from "../../../tracks/graphQL/tracks.types";

type Props = {
    track: Track
}

export const TrackEndTime: FC<Props> = ({track}) => {
    const endTime = track.endTime
    const endTimeDate = new Date(endTime)
    const endTimeLabel = moment(endTimeDate).format('YYYY/MM/DD HH:mm:ss')
    return (
        <>
            <CalendarOutlined className={s.icons}/>{endTimeLabel}
        </>
    )
}