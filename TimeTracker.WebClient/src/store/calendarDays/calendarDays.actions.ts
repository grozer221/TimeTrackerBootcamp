import {ValueOf} from "../store";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";
import {
    CalendarDaysCreateInputType,
    CalendarDaysCreateRangeInputType, CalendarDaysUpdateInputType
} from "../../graphQL/modules/calendarDays/calendarDays.mutations";

export const prefix = 'CALENDAR_DAYS_';

export const calendarDaysActions = {
    addCalendarDays: (calendarDays: CalendarDay[]) => ({
        type: `${prefix}ADD_CALENDAR_DAYS`,
        payload: calendarDays,
    } as const),
    getAsync: () => ({
        type: `${prefix}GET_ASYNC`,
    } as const),

    createAsync: (calendarDaysCreateInputType: CalendarDaysCreateInputType) => ({
        type: `${prefix}CREATE_ASYNC`,
        payload: calendarDaysCreateInputType,
    } as const),
    createRangeAsync: (calendarDaysCreateRangeInputType: CalendarDaysCreateRangeInputType) => ({
        type: `${prefix}CREATE_RANGE_ASYNC`,
        payload: calendarDaysCreateRangeInputType,
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

    removeCalendarDay: (calendarDay: CalendarDay) => ({
        type: `${prefix}REMOVE_CALENDAR_DAY`,
        payload: calendarDay,
    } as const),
    removeAsync: (date: string) => ({
        type: `${prefix}REMOVE_ASYNC`,
        payload: date,
    } as const),
    setLoadingRemove: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_REMOVE`,
        payload: loading,
    } as const),
};

export type CalendarDayActionCreatorTypes = ValueOf<typeof calendarDaysActions>;
export type CalendarDayActionTypes = ReturnType<CalendarDayActionCreatorTypes>;
