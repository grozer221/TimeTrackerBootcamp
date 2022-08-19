import React, {FC} from 'react';
import {DatePicker, DatePickerProps} from 'antd';
import {tracksAction} from "../../../tracks/store/tracks.slice";
import {useDispatch} from "react-redux";
import {Track} from "../../../tracks/graphQL/tracks.types";
import moment from "moment";
import {UpdateTrackInput} from "../../../tracks/graphQL/tracks.mutations";
import {PayloadAction} from "@reduxjs/toolkit";

type Props = {
    track: Track,

    updateCallback: (updateTrackInput: UpdateTrackInput) => PayloadAction<UpdateTrackInput, string>
}

export const TrackEndTimeEdit: FC<Props> = ({track, updateCallback}) => {
    let endTime = track.endTime
    const today = new Date()
    const dispatch = useDispatch()

    const onChange = (value: DatePickerProps['value']) => {
        const newTrack = {
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: value!.utc().format('YYYY-MM-DDTHH:mm:ss')
        }
        dispatch(updateCallback(newTrack))
    }


    return (
        <>
            <DatePicker
                allowClear={false}
                showTime={{ format: 'HH:mm:ss' }}
                format={"YYYY/MM/DD HH:mm:ss"}
                onChange={onChange}
                defaultValue={moment(new Date(endTime))}
                disabledDate={(currentDate) =>
                    today.getMonth() !== +currentDate.month() || today.getFullYear() !== +currentDate.year()
                }
            />
        </>
    )
}