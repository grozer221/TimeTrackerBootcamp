import {gql} from '@apollo/client';
import {CALENDAR_DAY_FRAGMENT} from "./calendarDays.fragments";
import {CalendarDay} from "./calendarDays.types";

export type CalendarDaysGetData = { calendarDays: { get: CalendarDay[] } }
export type CalendarDaysGetVars = {}
export const CALENDAR_DAYS_GET_QUERY = gql`
    ${CALENDAR_DAY_FRAGMENT}
    query CalendarDaysGet {
        calendarDays {
            get(calendarDaysGetInputType: {
                from: "2021-01-01",
                to: "2023-07-14",
            }) {
                ...CalendarDayFragment
            }
        }
    }
`;