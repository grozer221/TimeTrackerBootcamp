import React, {FC, useEffect} from 'react';
import {useTimer} from "use-timer";
import {toUTCDateTime} from "../../../../convertors/toUTCDateTime";
import moment from "moment";

type Props = {
    clockTime: string | null
}

type TimerProps = {
    time: number
}

const Timer: FC<TimerProps> = ({time})=>{
    const totalMilliseconds = time * 1000
    const totalDate = new Date(totalMilliseconds)
    /*const totalDateUTC = toUTCDateTime(totalDate)*/
    const totalTime = moment(totalDate).format("HH:mm:ss")

    useEffect(()=>{
        localStorage.setItem('clockTime', totalTime)
        document.title = "Time Tracker " + totalTime
    }, [time])

    return(<></>)
}

export const TitleClock: FC<Props> = React.memo(({clockTime}) =>
    {
        if(clockTime === 'Invalid Date')
            return(<></>)
        const startDate = new Date(clockTime as string)
        const initialTime = startDate.getTime()/1000
        const {time, start, pause, reset, status, advanceTime} = useTimer({initialTime});

        useEffect(()=>{
            if(clockTime === 'Invalid Date') {
                clockTime=''
                reset()
                return
            }

            if(clockTime)
                console.log('Поехали')
                start()

        }, [clockTime])

        return (
            <><Timer time={time}/></>
        )
    }
)