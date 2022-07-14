import {Reducer} from "redux";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";
import {CalendarDayActionTypes} from "./calendarDays.actions";

type InitialState = {
    calendarDays: CalendarDay[],
}

const initialState = {
    calendarDays: [],
}

export const calendarDaysReducer: Reducer<InitialState, CalendarDayActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'ADD_CALENDAR_DAYS':
            return {...state, calendarDays: [...state.calendarDays, ...action.payload]};
        default:
            return state;
    }
}