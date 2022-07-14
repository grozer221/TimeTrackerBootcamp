import {ValueOf} from "../store";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";

export const calendarDaysActions = {
    addCalendarDays: (calendarDays: CalendarDay[]) => ({
        type: 'ADD_CALENDAR_DAYS',
        payload: calendarDays,
    } as const),
    getAsync: () => ({
        type: 'GET_ASYNC',
    } as const),
};

export type CalendarDayActionCreatorTypes = ValueOf<typeof calendarDaysActions>;
export type CalendarDayActionTypes = ReturnType<CalendarDayActionCreatorTypes>;
