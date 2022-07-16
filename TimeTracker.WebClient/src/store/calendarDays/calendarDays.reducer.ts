import {Reducer} from "redux";
import {CalendarDay} from "../../graphQL/modules/calendarDays/calendarDays.types";
import {CalendarDayActionTypes} from "./calendarDays.actions";
import moment, {Moment} from "moment";
import {getDateNow} from "../../utils/dateUtils";

type InitialState = {
    selectedDate: Moment,
    calendarDays: CalendarDay[],
    loadingGet: boolean,
    loadingCreate: boolean,
    loadingUpdate: boolean,
    loadingRemove: boolean,
}

const initialState: InitialState = {
    selectedDate: moment(getDateNow()),
    calendarDays: [],
    loadingGet: false,
    loadingCreate: false,
    loadingUpdate: false,
    loadingRemove: false,
}

export const calendarDaysReducer: Reducer<InitialState, CalendarDayActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'CALENDAR_DAYS_SET_SELECTED_DATE':
            return {...state, selectedDate: action.payload};

        case 'CALENDAR_DAYS_SET_LOADING_GET':
            return {...state, loadingGet: action.payload};
        case 'CALENDAR_DAYS_SET_CALENDAR_DAYS':
            return {...state, calendarDays: action.payload};
        case 'CALENDAR_DAYS_ADD_CALENDAR_DAYS':
            const unique = action.payload.filter(val => !state.calendarDays.some(day => day.id === val.id));
            return {...state, calendarDays: [...state.calendarDays, ...unique]};
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

        case 'CALENDAR_DAYS_RESET':
            return {
                ...state,
                calendarDays: [],
                loadingCreate: false,
                loadingUpdate: false,
                loadingRemove: false,
            };
        default:
            return state;
    }
}