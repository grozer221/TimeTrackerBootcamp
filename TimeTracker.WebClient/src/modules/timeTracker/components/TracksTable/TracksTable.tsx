import React from 'react';
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {Track} from "../../../tracks/graphQL/tracks.types";
import {getDifferenceBetweenDatesInTime} from "../../../../utils/dateUtils";
import {ColumnsType} from "antd/es/table";
import {TrackTitle} from "../Table/TrackTitle";
import {TrackKindInfo} from "../Table/TrackKindInfo";
import {TrackStartTime} from "../Table/TrackStartTime";
import {TrackEndTime} from "../Table/TrackEndTime";
import {TrackTools} from "../Table/TrackTools";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {Table, Typography} from "antd";
import s from "../../pages/TrackerPage/TrackerPage.module.css";
import {useAppSelector} from "../../../../store/store";
import {isAdministratorOrHavePermissions} from "../../../../utils/permissions";
import {Permission} from "../../../../graphQL/enums/Permission";

type DataType = {
    id: string
    userId: string,
    title: string,
    kind: TrackKind,
    startTime: string,
    endTime: string,
    duration: string,
    createdAt: string,
    updatedAt: string,
}

type Props = {
    tracks: Track[],
    date: string,
    loading: boolean
}

export const TracksTable: React.FC<Props> = React.memo(({tracks, date, loading}) => {
    let dateObj = new Date(date)
    const today = new Date()
    const ownerId =(tracks[0]) ? tracks[0].id : ''
    const isMe = useAppSelector(s => s.auth.authedUser?.id) as string == ownerId
    const editable = (dateObj.getMonth() == today.getMonth() && dateObj.getFullYear() == today.getFullYear())
        && (isAdministratorOrHavePermissions([Permission.UpdateOthersTimeTracker]) || isMe)


    let tableData = tracks.map(t => {
        return {
            ...t,
            duration: getDifferenceBetweenDatesInTime(new Date(t.startTime), new Date(t.endTime))
        } as DataType
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Title', dataIndex: 'title', key: 'title',
            render: (value, record, index) => {
                if (editable)
                    return <TrackTitle track={record}/>
                return <Typography.Paragraph>
                    <EditOutlined className={s.icons}/>{' ' + value}
                </Typography.Paragraph>
            }
        },
        {
            title: 'Kind', dataIndex: 'kind', key: 'kind',
            render: (value, record, index) => {
                return <TrackKindInfo kind={value}/>
            }
        },
        {
            title: 'StartTime', dataIndex: 'startTime', key: 'startTime',
            render: (value, record, index) => {
                return <TrackStartTime startTime={value}/>

            }
        },
        {
            title: 'EndTime', dataIndex: 'endTime', key: 'endTime',
            render: (value, record, index) => {
                return <TrackEndTime endTime={value}/>

            }
        },
        {title: 'Duration', dataIndex: 'duration', key: 'duration'},
        {
            title: 'Tools', dataIndex: 'operation', key: 'id',
            render: (text, record, index) => {
                if (editable)
                    return <TrackTools id={record.id}/>
                return <CloseOutlined/>
            },
        }
    ];


    return (
        <>
            <Table columns={columns}
                   dataSource={tableData}
                   rowKey={record => record.id}
                   pagination={false}
                   loading={loading}/>
        </>
    );
})