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
import {TrackKindEdit} from "../Table/TrackKindEdit";
import {TrackStartTimeEdit} from "../Table/TrackStartTimeEdit";
import {TrackEndTimeEdit} from "../Table/TrackEndTimeEdit";
import {
    CreateTrackForOtherUserInput,
    CreateTrackInput,
    RemoveTrackInput,
    UpdateTrackInput
} from "../../../tracks/graphQL/tracks.mutations";
import {PayloadAction} from "@reduxjs/toolkit";

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
    loading: boolean,
    canEditDateOrKind: boolean,
    crudCallbacks: {
        create: ((createTrackInput: CreateTrackInput | CreateTrackForOtherUserInput) => PayloadAction<CreateTrackInput | CreateTrackForOtherUserInput, string>),
        update: ((updateTrackInput: UpdateTrackInput) => PayloadAction<UpdateTrackInput, string>),
        remove: ((removeTrackInput: RemoveTrackInput) => PayloadAction<RemoveTrackInput, string>)
    }
}

export const TracksTable: React.FC<Props> = React.memo(({tracks, date, loading, canEditDateOrKind, crudCallbacks}) => {
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
                    return <TrackTitle track={record} updateCallback={crudCallbacks.update}/>
                return <Typography.Paragraph>
                    <EditOutlined className={s.icons}/>{' ' + value}
                </Typography.Paragraph>
            }
        },
        {
            title: 'Kind', dataIndex: 'kind', key: 'kind',
            render: (value, record, index) => {
                if(canEditDateOrKind)
                    return <TrackKindEdit track={record} updateCallback={crudCallbacks.update}/>
                return <TrackKindInfo kind={value}/>
            }
        },
        {
            title: 'StartTime', dataIndex: 'startTime', key: 'startTime',
            render: (value, record, index) => {
                if(canEditDateOrKind)
                    return <TrackStartTimeEdit track={record} updateCallback={crudCallbacks.update}/>
                return <TrackStartTime startTime={value}/>

            }
        },
        {
            title: 'EndTime', dataIndex: 'endTime', key: 'endTime',
            render: (value, record, index) => {
                if(canEditDateOrKind)
                    return <TrackEndTimeEdit track={record} updateCallback={crudCallbacks.update}/>
                return <TrackEndTime endTime={value}/>

            }
        },
        {title: 'Duration', dataIndex: 'duration', key: 'duration'},
        {
            title: 'Tools', dataIndex: 'operation', key: 'id',
            render: (text, record, index) => {
                if (editable)
                    return <TrackTools id={record.id} removeCallback={crudCallbacks.remove}/>
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