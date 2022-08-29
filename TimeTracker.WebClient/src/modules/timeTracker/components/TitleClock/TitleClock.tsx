import React, {FC, useEffect, useState} from 'react';
import moment from "moment";
import {render} from "react-dom";


export const TitleClock: FC = () => {
    const [time, setTime] = useState('')

    const sleep = (ms: number) => {
        let now = new Date().getTime();
        while (new Date().getTime() < now + ms) { /* Do nothing */
        }
    }

    useEffect(() => {
        console.log('a')
        sleep(200)
        document.title = 'Time Tracker' + time
        const startTime = localStorage.getItem('currentTrackStartTime')
        if (!startTime) {
            console.log('...')
            return
        }
        const startTimeDate = new Date(startTime)
        const now = new Date()
        const totalMillisecond = now.getTime() - startTimeDate.getTime()
        const totalDate = new Date(totalMillisecond)
        console.log(totalDate)
        setTime(moment(totalDate).format("HH:mm:ss"))
    }, [time])

    return (
        <></>
    )
}