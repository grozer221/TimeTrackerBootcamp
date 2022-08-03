import React, {FC, useEffect} from "react";
import {Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../tracks/store/tracks.slice";
import moment from "moment";
import {useTimer} from "use-timer";

type stopwatchProps = {
    track: Track
}

type panelProps = {
    time: number
}

const Panel: FC<panelProps> = ({time}) => {
    const totalMilliseconds = time * 1000
    const totalDate = new Date(totalMilliseconds - 3 * 60 * 60 * 1000)
    const stopwatchValue = moment(totalDate).format("HH:mm:ss")
    return (
        <>
            <span>{stopwatchValue}</span>
        </>
    )
}

const Stopwatch: FC<stopwatchProps> = ({track}) => {
    let firstTrack = track
    const dispatch = useDispatch()
    const startDate = new Date(firstTrack.startTime)
    console.log(startDate)
    const endDate = new Date()
    let timerStartTime = (endDate.getTime() - startDate.getTime()) / 1000

    const {time, start, pause, reset, status, advanceTime} = useTimer({autostart: true, initialTime: timerStartTime});
    useEffect(()=>{
        if(time != timerStartTime)
            advanceTime(-time)

    }, [track])

    const OnEndTrack = () => {
        pause()
        reset()
        dispatch(tracksAction.updateTrack({
            id: track.id,
            title: track.title,
            kind: track.kind,
            startTime: track.startTime,
            endTime: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss')
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