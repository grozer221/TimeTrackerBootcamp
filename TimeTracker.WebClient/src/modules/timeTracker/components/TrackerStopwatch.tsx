import React, {FC, useEffect, useState} from "react";
import {Button, Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../tracks/store/tracks.slice";
import moment from "moment";
import {useTimer} from "use-timer";

type Props={
    track: Track
}



const Stopwatch: FC<Props> = ({track}) => {
    console.log('rendered')

    let firstTrack = track
    const startDate= new Date(firstTrack.startTime)
    const endDate = (firstTrack.endTime == null) ? new Date() : new Date(firstTrack.endTime)
    let timerStartTime = Math.floor((endDate.getTime() - startDate.getTime())/1000)
    const {time, start, pause, reset, status} = useTimer({autostart: true ,initialTime: timerStartTime});


    return(
        <>
            <div className={s.element}>
                <span>{("0" + Math.floor((time / (60 * 60 )) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor(((time / 60) % 60))).slice(-2)}:</span>
                <span>{("0" + Math.floor((time  % 60))).slice(-2)}{/*.*/}</span>
            </div>
        </>
    )
};

export default Stopwatch;