import {gql} from '@apollo/client';
import {CALENDAR_DAY_FRAGMENT} from "./calendarDays.fragments";
import {CalendarDay} from "./calendarDays.types";

export type CalendarDaysGetData = { calendarDays: { get: CalendarDay[] } }
export type CalendarDaysGetVars = { calendarDaysGetInputType: CalendarDaysGetInputType }
export type CalendarDaysGetInputType = { from: string, to: string }
export const CALENDAR_DAYS_GET_QUERY = gql`
    ${CALENDAR_DAY_FRAGMENT}
    query CalendarDaysGet($calendarDaysGetInputType: CalendarDaysGetInputType!){
        calendarDays {
            get(calendarDaysGetInputType: $calendarDaysGetInputType) {
                ...CalendarDayFragment
            }
        }
    }
`;