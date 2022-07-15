import {Reducer} from "redux";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";
import {CalendarDayActionTypes} from "./calendarDays.actions";

type InitialState = {
    calendarDays: CalendarDay[],
    loadingCreate: boolean,
    loadingUpdate: boolean,
    loadingRemove: boolean,
}

const initialState: InitialState = {
    calendarDays: [],
    loadingCreate: false,
    loadingUpdate: false,
    loadingRemove: false,
}

export const calendarDaysReducer: Reducer<InitialState, CalendarDayActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'CALENDAR_DAYS_ADD_CALENDAR_DAYS':
            return {...state, calendarDays: [...state.calendarDays, ...action.payload]};
        case 'CALENDAR_DAYS_SET_LOADING_CREATE':
            return {...state, loadingCreate: action.payload};

        case 'CALENDAR_DAYS_UPDATE_CALENDAR_DAY':
            return {
                ...state, calendarDays: state.calendarDays.map(day =>
                    day.id === action.payload.id
                        ? action.payload
                        : day
                )
            };
        case 'CALENDAR_DAYS_SET_LOADING_UPDATE':
            return {...state, loadingUpdate: action.payload};

        case 'CALENDAR_DAYS_REMOVE_CALENDAR_DAY_BY_DATES':
            return {...state, calendarDays: state.calendarDays.filter(d => !action.payload.includes(d.date))};
        case 'CALENDAR_DAYS_REMOVE_CALENDAR_DAY':
            return {...state, calendarDays: state.calendarDays.filter(d => d.id !== action.payload.id)};
        case 'CALENDAR_DAYS_SET_LOADING_REMOVE':
            return {...state, loadingRemove: action.payload};
        default:
            return state;
    }
}