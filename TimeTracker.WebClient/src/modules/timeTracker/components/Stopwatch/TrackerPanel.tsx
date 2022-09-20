import React, {FC, useEffect, useState} from "react";
import {Card, Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../graphQL/tracks.types";
import moment from "moment";
import {useTimer} from "use-timer";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";
import {
    CreateTrackForOtherUserInput,
    CreateTrackInput, RemoveTrackInput,
    UpdateTrackInput
} from "../../graphQL/tracks.mutations";
import {PayloadAction} from "@reduxjs/toolkit";
import {TrackTools} from "../Table/TrackTools";
import {TrackTitleInput} from "../Table/TrackTitleInput";
import {tracksAction} from "../../store/tracks.slice";

type timerProps = {
    time: number
}

type trackerPanelProps = {
    track: Track,
    /*crudCallbacks: {
        update: ((updateTrackInput: UpdateTrackInput) => PayloadAction<UpdateTrackInput, string>),
        remove: ((removeTrackInput: RemoveTrackInput) => PayloadAction<RemoveTrackInput, string>)
    }*/
}

const Timer: FC<timerProps> =({time}) =>{
    const totalMilliseconds = time * 1000
    const totalDate = new Date(totalMilliseconds)
    const totalDateUTC = toUTCDateTime(totalDate)
    const clockTime = moment(totalDateUTC).format("HH:mm:ss")

    useEffect(()=>{
        document.title = `Time Tracker (${clockTime})`
    }, [time])

    return(
        <>
            {clockTime}
        </>
    )
}

export const TrackerPanel: FC<trackerPanelProps> = ({track/*, crudCallbacks*/}) => {
    const startDate = new Date(track.startTime)
    const endDate = new Date()
    let timerStartTime = (endDate.getTime() - startDate.getTime()) / 1000
    console.log(endDate)
    const {time, start, pause, reset, status, advanceTime} = useTimer();


    const update = (updateTrackInput: UpdateTrackInput) => {
        return tracksAction.updateTrack(updateTrackInput)
    }

    /*const create = (createTrackInput: CreateTrackInput | CreateTrackForOtherUserInput) => {
        return tracksAction.createTrack(createTrackInput as CreateTrackInput)
    }*/

    const remove = (removeTrackInput: RemoveTrackInput) => {
        return tracksAction.removeTrack(removeTrackInput)
    }

    useEffect(() => {
        if (track.endTime) {
            reset()
        }
        if (time != timerStartTime && !track.endTime) {
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
                    <Timer time={time}/>
                    <div className={s.current_track_panel_row}>
                        <TrackTitleInput track={track} updateCallback={update}/>
                    </div>
                </div>
            </div>
            <Divider/>

        </>
    )
}
