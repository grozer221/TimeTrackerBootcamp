import React, {FC, useEffect} from "react";
import {Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../../tracks/store/tracks.slice";
import moment from "moment";
import {useTimer} from "use-timer";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";

type stopwatchProps = {
    track: Track
}

type panelProps = {
    time: number
}

const Panel: FC<panelProps> = ({time}) => {
    const totalMilliseconds = time * 1000
    const totalDate = new Date(totalMilliseconds)
    const totalDateUTC = toUTCDateTime(totalDate)
    const clockTime = moment(totalDateUTC).format("HH:mm:ss")
    return (
        <>
            <span>{clockTime}</span>
        </>
    )
}

const Stopwatch: FC<stopwatchProps> = ({track}) => {
    let firstTrack = track
    const dispatch = useDispatch()
    const startDate = new Date(firstTrack.startTime)
    const endDate = new Date()
    let timerStartTime = (endDate.getTime() - startDate.getTime()) / 1000
    const {time, start, pause, reset, status, advanceTime} = useTimer({});



    useEffect(()=>{
        if(track.endTime)
            reset()
        if(time != timerStartTime && !track.endTime ) {
            reset()
            start()
            advanceTime(timerStartTime)
        }

    }, [track])

    const OnEndTrack = () => {
        reset()
        if(track.endTime)
            return
        const endTimeUTC = toUTCDateTime(endDate)
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: moment(endTimeUTC).format('YYYY-MM-DDTHH:mm:ss')
        }))
    }
    return (
        <>
            <Divider/>
            <div className={s.stopwatch_container}>
                <div className={s.element}>
                    <Panel time={time}/>
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