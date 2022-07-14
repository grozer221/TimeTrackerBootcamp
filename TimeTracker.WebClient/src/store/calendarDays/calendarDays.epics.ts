import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../store";
import {from, map, mergeMap} from "rxjs";
import {client} from "../../graphQL/client";
import {calendarDaysActions} from "./calendarDays.actions";
import {
    CALENDAR_DAYS_GET_QUERY,
    CalendarDaysGetData,
    CalendarDaysGetVars
} from "../../graphQL/modules/calendarDays/calendarDays.queries";

export const calendarDaysGetEpic: Epic<ReturnType<typeof calendarDaysActions.getAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('GET_ASYNC'),
        mergeMap(action =>
            from(client.query<CalendarDaysGetData, CalendarDaysGetVars>({
                query: CALENDAR_DAYS_GET_QUERY,
            })).pipe(
                map(response => response.errors?.length
                    ? calendarDaysActions.addCalendarDays([])
                    : calendarDaysActions.addCalendarDays(response.data.calendarDays.get))
            )
        )
    );

// @ts-ignore
export const calendarDaysEpics = combineEpics(calendarDaysGetEpic)