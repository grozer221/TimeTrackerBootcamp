import React, {FC, useEffect, useState} from "react";
import {Card, Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../../tracks/graphQL/tracks.types";
import moment from "moment";
import {useTimer} from "use-timer";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";
import {CurrentTrackInfo} from "../CurrentTrack/CurrentTrack";
import {
    CreateTrackForOtherUserInput,
    CreateTrackInput, RemoveTrackInput,
    UpdateTrackInput
} from "../../../tracks/graphQL/tracks.mutations";
import {PayloadAction} from "@reduxjs/toolkit";
import {TrackTools} from "../Table/TrackTools";
import {TrackTitle} from "../Table/TrackTitle";

type panelProps = {
    time: number
}

type trackerPanelProps = {
    track: Track,
    crudCallbacks: {
        update: ((updateTrackInput: UpdateTrackInput) => PayloadAction<UpdateTrackInput, string>),
        remove: ((removeTrackInput: RemoveTrackInput) => PayloadAction<RemoveTrackInput, string>)
    }
}

const Panel: FC<panelProps> = ({time}) => {




    return (
        <>

        </>
    )
}

export const TrackerPanel: FC<trackerPanelProps> = ({track, crudCallbacks}) => {
    const startDate = new Date(track.startTime)
    const endDate = new Date()
    let timerStartTime = (endDate.getTime() - startDate.getTime()) / 1000
    const {time, start, pause, reset, status, advanceTime} = useTimer({});
    const totalMilliseconds = time * 1000
    const totalDate = new Date(totalMilliseconds)
    const totalDateUTC = toUTCDateTime(totalDate)
    const clockTime = moment(totalDateUTC).format("HH:mm:ss")

    useEffect(() => {
        if(time > 0)
            console.log(track)
            localStorage.setItem('clockTime', totalDateUTC.toString())
    }, [time])

    useEffect(() => {
        if (track.endTime) {
            reset()
            pause()
        }
        if (track && time != timerStartTime && !track.endTime) {
            reset()
            start()
            advanceTime(timerStartTime)
        }

    }, [track])

    if (!time)
        return (<></>)

    return (
        <>
            <div className={s.current_track_panel}>
                <div className={s.stopwatch}>
                    {clockTime}
                    {/*<Panel time={time}/>*/}

                    <div className={s.current_track_panel_row}>
                        <TrackTitle track={track} updateCallback={crudCallbacks.update}/>
                        <TrackTools id={track.id} removeCallback={crudCallbacks.remove}/>
                    </div>
                </div>
            </div>
            <Divider/>

        </>
    )
}
