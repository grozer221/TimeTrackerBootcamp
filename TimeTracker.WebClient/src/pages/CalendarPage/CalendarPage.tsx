import React, {useEffect, useState} from 'react';
import {Calendar, Row, Space} from "antd";
import moment, {Moment} from 'moment';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {calendarDaysActions} from "../../store/calendarDays/calendarDays.actions";
import {RootState} from "../../store/store";
import s from './CalendarPage.module.css';
import {ButtonCreate} from "../../components/ButtonCreate/ButtonCreate";
import {DayKind} from "../../graphQL/enums/DayKind";
import {ButtonRemove} from "../../components/ButtonRemove/ButtonRemove";
import {ButtonUpdate} from "../../components/ButtonUpdate/ButtonUpdate";
import {uppercaseToWords} from "../../utils/stringUtils";

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

    const dateCellRender = (current: Moment) => {
        let dayKindClass;
        const currentCalendarDay = calendarDays.find(d => d.date === current.format("YYYY-MM-DD"));
        switch (currentCalendarDay?.kind) {
            case DayKind.DayOff:
                dayKindClass = s.dayOff;
                break;
            case DayKind.Holiday:
                dayKindClass = s.holiday;
                break;
            case DayKind.ShortDay:
                dayKindClass = s.shortDay;
                break;
        }
        return (
            <div className={[s.day, dayKindClass].join(' ')}>
                <div className={s.kind}>{currentCalendarDay && uppercaseToWords(currentCalendarDay.kind)}</div>
                <Row align={'bottom'} className={s.buttons}>
                    {currentCalendarDay
                        ? <Space size={3}>
                            <ButtonRemove to={`days/remove/${currentCalendarDay?.date}`} popup={location}/>
                            <ButtonUpdate to={`days/update/${currentCalendarDay?.date}`} popup={location}/>
                        </Space>
                        : <ButtonCreate to={`days/create?date=${current.format('YYYY-MM-DD')}`} popup={location}/>
                    }
                </Row>
            </div>
        );
    }

    return (
        <>
            <Space size={3}>
                <ButtonCreate to={'days/create'} popup={location}/>
                <ButtonRemove to={'days/remove'} popup={location}/>
            </Space>
            <Calendar
                dateCellRender={dateCellRender}
                onPanelChange={onPanelChange}
                validRange={[moment('2021-01-25'), moment('2023-01-25')]}
            />
        </>
    );
};