import React, {CSSProperties} from "react";
import {DayKind} from "../graphQL/enums/DayKind";
import {Moment} from "moment";
import {CalendarDay} from "../graphQL/modules/calendarDays/calendarDays.types";

export const dateRender = (current: Moment, calendarDays: CalendarDay[]) => {
    const style: CSSProperties = {};
    const currentCalendarDay = calendarDays.find(d => d.date === current.format("YYYY-MM-DD"));
    if (currentCalendarDay) {
        switch (currentCalendarDay.kind) {
            case DayKind.DayOff:
                style.border = '1px solid lightskyblue';
                break;
            case DayKind.Holiday:
                style.border = '1px solid red';
                style.borderRadius = '50%';
                break;
            case DayKind.ShortDay:
                style.border = '1px solid orange';
                style.borderRadius = '50%';
                break;
        }
    }
    return (
        <div className="ant-picker-cell-inner" style={style}>
            {current.date()}
        </div>
    );
}