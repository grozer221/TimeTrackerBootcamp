import React, {FC} from 'react';
import {CalendarOutlined, SyncOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import s from '../pages/TrackerPage/TrackerPage.module.css'
import moment from "moment";

type Props = {
    endTime: string
}

export const TrackEndTime: FC<Props> = ({endTime}) => {
    const endTimeDate = new Date(endTime)
    const endTimeLabel = moment(endTimeDate).format('YYYY/MM/DD HH:mm:ss')
    return (
        <>
            <div className={s.cell} style={{width: '20%'}}>
                {endTime ?
                    <><CalendarOutlined className={s.icons}/>{endTimeLabel}</> :
                    <Tag icon={<SyncOutlined spin/>} color="processing">
                        PROCESSING
                    </Tag>
                }
            </div>
            <div className={s.divider}/>
        </>
    )
}