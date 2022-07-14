import React, {useEffect, useState} from 'react';
import {Button, Calendar as AntCalendar} from "antd";
import moment, {Moment} from 'moment';
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../store/calendarDays/calendarDays.actions";
import {RootState} from "../../store/store";
import {CalendarDay, DayKind} from "../../graphQL/modules/calendarDays/calendarDays.types";
import s from './CalendarPage.module.css';

export const CalendarPage = () => {
    const [value, setValue] = useState<Moment | undefined>();
    const [selectedValue, setSelectedValue] = useState<Moment | undefined>();
    const location = useLocation();
    const dispatch = useDispatch();
    const calendarDays = useSelector((s: RootState) => s.calendarDays.calendarDays)

    useEffect(() => {
        dispatch(calendarDaysActions.getAsync());
    }, [])

    const onPanelChange = (newValue: Moment) => {
        console.log('onPanelChange ' + newValue)
    };

    const onSelect = (newValue: Moment) => {
        setValue(newValue);
        console.log('onSelect ' + newValue)
    }

    return (
        <>
            <Button>
                <Link to="/calendar/days/create" state={{background: location}}>
                    Create days
                </Link>
            </Button>
            <AntCalendar
                onPanelChange={onPanelChange}
                dateCellRender={(date: Moment) => {
                    const currentDate = date.format("YYYY-MM-DD")
                    if (calendarDays.some(day => day.date === currentDate)) {
                        const currentDay = calendarDays.find(day => day.date === currentDate) as CalendarDay
                        switch (currentDay.kind) {
                            case DayKind.DayOff:
                                return <div className={[s.day, s.dayOff].join(' ')}>
                                    {currentDay.percentageWorkHours}
                                </div>
                            case DayKind.Holiday:
                                return <div className={[s.day, s.holiday].join(' ')}>
                                    {currentDay.percentageWorkHours}
                                </div>
                            case DayKind.ShortDay:
                                return <div className={[s.day, s.shortDay].join(' ')}>
                                    {currentDay.percentageWorkHours}
                                </div>
                        }
                    }
                }}
                validRange={[moment('2021-01-25'), moment('2023-01-25')]}
            />
        </>
    );
};