import React, {useState} from 'react';
import {Calendar as AntCalendar} from "antd";
import moment, {Moment} from 'moment';
import s from './Calendar.module.css';
import uk_UA from 'antd/lib/calendar/locale/ru_RU';

const dateCellRender = (value: Moment) => {
    let listData;
    if (value.day() === 0 || value.day() === 6)
        return (
            <div className={s.dayOff}>
            </div>
        );
};

export const Calendar = () => {
    const [value, setValue] = useState<Moment | undefined>();
    const [selectedValue, setSelectedValue] = useState<Moment | undefined>();

    const onPanelChange = (newValue: Moment) => {
        console.log('onPanelChange ' + newValue)
    };

    const onSelect = (newValue: Moment) => {
        setValue(newValue);
        console.log('onSelect ' + newValue)
    }

    return (
        <>
            <AntCalendar
                locale={uk_UA}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
                validRange={[moment('2021-01-25'), moment('2023-01-25')]}
            />
        </>
    );
};