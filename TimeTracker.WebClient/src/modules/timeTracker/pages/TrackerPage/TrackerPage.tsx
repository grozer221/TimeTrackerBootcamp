import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {CloseOutlined, SmileOutlined} from '@ant-design/icons';
import {DatePicker, Table, Typography} from 'antd';
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useAppSelector} from "../../../../store/store";
import {isAuthenticated} from "../../../../utils/permissions";
import {TrackKind} from "../../../../graphQL/enums/TrackKind";
import {Stopwatch} from "../../components/Stopwatch/TrackerStopwatch";
import Title from "antd/lib/typography/Title";
import {ColumnsType} from "antd/es/table";
import moment, {now} from "moment";
import {TrackTitle} from "../../components/Table/TrackTitle";
import {TrackKindInfo} from "../../components/Table/TrackKindInfo";
import {TrackEndTime} from "../../components/Table/TrackEndTime";
import {TrackStartTime} from "../../components/Table/TrackStartTime";
import {TrackTools} from "../../components/Table/TrackTools";
import {getDifferenceBetweenDatesInTime} from "../../../../utils/dateUtils";
import {TracksTable} from "../../components/TracksTable/TracksTable";
import s from "./TrackerPage.module.css"
import {
    CreateTrackForOtherUserInput,
    CreateTrackInput,
    RemoveTrackInput,
    UpdateTrackInput
} from "../../../tracks/graphQL/tracks.mutations";

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

export const TrackerPage: React.FC = () => {
    const isAuth = useAppSelector(s => s.auth.isAuth)
    const loadingGet = useAppSelector(s => s.tracks.loadingGet)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useAppSelector(s => s.auth.authedUser?.id) as string
    const canEditDateOrKind = false


    const tracks = useAppSelector(s => s.tracks.tracks)
    const currentTrack = useAppSelector(s => s.tracks.currentTrack)

    const [searchParams, setSearchParams] = useSearchParams({});
    const trackKind = searchParams.get('kind') || ''
    const indexOfS = Object.values(TrackKind).indexOf(trackKind as unknown as TrackKind)

    let [date, setDate] = useState(moment(now()).toISOString())

    const update = (updateTrackInput: UpdateTrackInput) => {
        return tracksAction.updateTrack(updateTrackInput)
    }

    const create = (createTrackInput: CreateTrackInput | CreateTrackForOtherUserInput) => {
        return tracksAction.createTrack(createTrackInput as CreateTrackInput)
    }

    const remove = (removeTrackInput: RemoveTrackInput) => {
        return tracksAction.removeTrack(removeTrackInput)
    }

    useEffect(() => {
        if (!isAuthenticated())
            navigate('/auth/login');
    }, [isAuth])


    useEffect(() => {
        dispatch(tracksAction.getCurrentAsync())
        dispatch(tracksAction.setGetTracksInputData({UserId: userId, Date: date}))
        dispatch(tracksAction.getTracksByUserIdAndDate({UserId: userId, Date: date}))
    }, [setSearchParams])

    useEffect(()=>{
        dispatch(tracksAction.getCurrentAsync())
        dispatch(tracksAction.setGetTracksInputData({UserId: userId, Date: date}))
        dispatch(tracksAction.getTracksByUserIdAndDate({UserId: userId, Date: date}))
    }, [date])


    return (
        <>
            <Stopwatch track={currentTrack} crudCallbacks={{create, update, remove}}/>
            <DatePicker className={s.date_picker} picker={"month"} defaultValue={moment(now())} onChange={e => {
                if (e != null)
                    setDate(e.toISOString())
            }}/>
            <TracksTable tracks={tracks} date={date} loading={loadingGet} canEditDateOrKind={canEditDateOrKind} crudCallbacks={{create, update, remove}}/>
        </>
    );
};

