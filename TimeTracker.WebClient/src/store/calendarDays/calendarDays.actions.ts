import {ValueOf} from "../store";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";
import {
    CalendarDaysCreateInputType,
    CalendarDaysCreateRangeInputType,
    CalendarDaysUpdateInputType
} from "../../graphQL/modules/calendarDays/calendarDays.mutations";
import {DayOfWeek} from "../../graphQL/enums/DayOfWeek";
import {Moment} from "moment";

export const prefix = 'CALENDAR_DAYS_';

export const calendarDaysActions = {
    setSelectedDate: (date: Moment) => ({
        type: `${prefix}SET_SELECTED_DATE`,
        payload: date,
    } as const),

    setCalendarDays: (calendarDays: CalendarDay[]) => ({
        type: `${prefix}SET_CALENDAR_DAYS`,
        payload: calendarDays,
    } as const),
    addCalendarDays: (calendarDays: CalendarDay[]) => ({
        type: `${prefix}ADD_CALENDAR_DAYS`,
        payload: calendarDays,
    } as const),
    getAsync: (from: string, to: string) => ({
        type: `${prefix}GET_ASYNC`,
        payload: {from, to}
    } as const),
    setLoadingGet: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_GET`,
        payload: loading
    } as const),

    createAsync: (calendarDaysCreateInputType: CalendarDaysCreateInputType, override: boolean) => ({
        type: `${prefix}CREATE_ASYNC`,
        payload: {calendarDaysCreateInputType, override},
    } as const),
    createRangeAsync: (calendarDaysCreateRangeInputType: CalendarDaysCreateRangeInputType, override: boolean) => ({
        type: `${prefix}CREATE_RANGE_ASYNC`,
        payload: {calendarDaysCreateRangeInputType, override},
    } as const),
    setLoadingCreate: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_CREATE`,
        payload: loading,
    } as const),

    updateCalendarDay: (calendarDay: CalendarDay) => ({
        type: `${prefix}UPDATE_CALENDAR_DAY`,
        payload: calendarDay,
    } as const),
    updateAsync: (calendarDaysUpdateInputType: CalendarDaysUpdateInputType) => ({
        type: `${prefix}UPDATE_ASYNC`,
        payload: calendarDaysUpdateInputType,
    } as const),
    setLoadingUpdate: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_UPDATE`,
        payload: loading,
    } as const),

    removeCalendarDayByDates: (date: string[]) => ({
        type: `${prefix}REMOVE_CALENDAR_DAY_BY_DATES`,
        payload: date,
    } as const),
    removeCalendarDay: (calendarDay: CalendarDay) => ({
        type: `${prefix}REMOVE_CALENDAR_DAY`,
        payload: calendarDay,
    } as const),
    removeAsync: (date: string) => ({
        type: `${prefix}REMOVE_ASYNC`,
        payload: date,
    } as const),
    removeRangeAsync: (from: string, to: string, daysOfWeek: DayOfWeek[]) => ({
        type: `${prefix}REMOVE_RANGE_ASYNC`,
        payload: {from, to, daysOfWeek},
    } as const),
    setLoadingRemove: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_REMOVE`,
        payload: loading,
    } as const),

    reset: () => ({
        type: `${prefix}RESET`,
    } as const),
};

export type CalendarDayActionCreatorTypes = ValueOf<typeof calendarDaysActions>;
export type CalendarDayActionTypes = ReturnType<CalendarDayActionCreatorTypes>;
