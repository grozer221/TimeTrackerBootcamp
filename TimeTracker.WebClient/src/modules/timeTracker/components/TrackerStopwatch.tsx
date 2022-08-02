import React, {FC, useEffect, useState} from "react";
import {Button, Divider} from "antd";
import s from './TrackerStopwatch.module.css'
import {Track} from "../../tracks/graphQL/tracks.types";
import {useDispatch} from "react-redux";
import {tracksAction} from "../../tracks/store/tracks.slice";
import {stringToUSDatetime} from "../../../convertors/stringToDatetimeConvertors";
import moment from "moment";

type Props={
    track: Track
}



const Stopwatch: FC<Props> = ({track}) => {
    const startDate= new Date(track.startTime)
    const endDate = (track.endTime == null) ? new Date() : new Date(track.endTime)
    const start = endDate.getTime() - startDate.getTime()
    const [time, setTime] = useState(start)
    const [timerOn, setTimerOn] = React.useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        let interval : any = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const OnEndTrack = () => {
        setTime(0)
        setTimerOn(false)
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
                    <span>{("0" + Math.floor((time / (60 * 60 * 1000)) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
                    <span  style={{fontSize: '48px'}}>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>

                <div >
                    <button className={s.stop_button} onClick={OnEndTrack}>End Track</button>
                </div>
            </div>
            <Divider/>
        </>

    );
};

export default Stopwatch;