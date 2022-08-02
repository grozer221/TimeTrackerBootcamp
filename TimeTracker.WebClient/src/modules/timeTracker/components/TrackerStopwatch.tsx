import React, {FC, useEffect, useState} from "react";
import {Button, Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../tracks/store/tracks.slice";
import moment from "moment";
import {useTimer} from "use-timer";

type Props = {
    track: Track
}


const Stopwatch: FC<Props> = ({track}) => {
    console.log('rendered')

    let firstTrack = track
    const dispatch = useDispatch()
    const startDate = new Date(firstTrack.startTime)
    const endDate = (firstTrack.endTime == null) ? new Date() : new Date(firstTrack.endTime)
    let timerStartTime = Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
    const {time, start, pause, reset, status} = useTimer({autostart: true, initialTime: timerStartTime});
    const OnEndTrack = () => {
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss')
        }))
        reset()
    }

    return (
        <>
            <Divider/>
            <div className={s.stopwatch_container}>

                <div className={s.element}>
                    <span>{("0" + Math.floor((time / (60 * 60)) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor(((time / 60) % 60))).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time % 60))).slice(-2)}{/*.*/}</span>
                </div>
                <div>
                    <button className={s.stop_button} onClick={OnEndTrack}>End Track</button>
                </div>
            </div>
            <Divider/>
        </>

    )
};

export default Stopwatch;