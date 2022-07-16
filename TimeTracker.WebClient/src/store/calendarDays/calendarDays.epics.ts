import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../store";
import {catchError, endWith, from, map, mergeMap, of, startWith} from "rxjs";
import {client} from "../../graphQL/client";
import {calendarDaysActions} from "./calendarDays.actions";
import {
    CALENDAR_DAYS_GET_QUERY,
    CalendarDaysGetData,
    CalendarDaysGetVars
} from "../../graphQL/modules/calendarDays/calendarDays.queries";
import {
    CALENDAR_DAYS_CREATE_MUTATION,
    CALENDAR_DAYS_CREATE_RANGE_MUTATION,
    CALENDAR_DAYS_REMOVE_MUTATION,
    CALENDAR_DAYS_REMOVE_RANGE_MUTATION,
    CALENDAR_DAYS_UPDATE_MUTATION,
    CalendarDaysCreateData,
    CalendarDaysCreateRangeData,
    CalendarDaysCreateRangeVars,
    CalendarDaysCreateVars,
    CalendarDaysRemoveData,
    CalendarDaysRemoveRangeData,
    CalendarDaysRemoveRangeVars,
    CalendarDaysRemoveVars,
    CalendarDaysUpdateData,
    CalendarDaysUpdateVars
} from "../../graphQL/modules/calendarDays/calendarDays.mutations";
import {notificationsActions} from "../notifications/notifications.actions";
import {navigateActions} from "../navigate/navigate.actions";

export const calendarDaysGetEpic: Epic<ReturnType<typeof calendarDaysActions.getAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_GET_ASYNC'),
        mergeMap(action =>
            from(client.query<CalendarDaysGetData, CalendarDaysGetVars>({
                query: CALENDAR_DAYS_GET_QUERY,
                variables: {calendarDaysGetInputType: action.payload}
            })).pipe(
                map(response => calendarDaysActions.addCalendarDays(response.data?.calendarDays.get)),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingGet(true)),
                endWith(calendarDaysActions.setLoadingGet(false)),
            )
        )
    );

export const calendarDaysCreateEpic: Epic<ReturnType<typeof calendarDaysActions.createAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_CREATE_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CalendarDaysCreateData, CalendarDaysCreateVars>({
                mutation: CALENDAR_DAYS_CREATE_MUTATION,
                variables: action.payload,
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            calendarDaysActions.removeCalendarDayByDates([response.data.calendarDays.create.date]),
                            calendarDaysActions.addCalendarDays([response.data.calendarDays.create]),
                            navigateActions.navigate(-1),
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingCreate(true)),
                endWith(calendarDaysActions.setLoadingCreate(false)),
            )
        )
    );

export const calendarDaysCreateRangeEpic: Epic<ReturnType<typeof calendarDaysActions.createRangeAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_CREATE_RANGE_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CalendarDaysCreateRangeData, CalendarDaysCreateRangeVars>({
                mutation: CALENDAR_DAYS_CREATE_RANGE_MUTATION,
                variables: action.payload,
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            calendarDaysActions.removeCalendarDayByDates(response.data.calendarDays.createRange.map(day => day.date)),
                            calendarDaysActions.addCalendarDays(response.data.calendarDays.createRange),
                            navigateActions.navigate(-1),
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingCreate(true)),
                endWith(calendarDaysActions.setLoadingCreate(false)),
            )
        )
    );

export const calendarDaysUpdateEpic: Epic<ReturnType<typeof calendarDaysActions.updateAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_UPDATE_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CalendarDaysUpdateData, CalendarDaysUpdateVars>({
                mutation: CALENDAR_DAYS_UPDATE_MUTATION,
                variables: {calendarDaysUpdateInputType: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            calendarDaysActions.updateCalendarDay(response.data.calendarDays.update),
                            navigateActions.navigate(-1),
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingUpdate(true)),
                endWith(calendarDaysActions.setLoadingUpdate(false)),
            )
        )
    );

export const calendarDaysRemoveEpic: Epic<ReturnType<typeof calendarDaysActions.removeAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_REMOVE_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CalendarDaysRemoveData, CalendarDaysRemoveVars>({
                mutation: CALENDAR_DAYS_REMOVE_MUTATION,
                variables: {date: action.payload},
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            calendarDaysActions.removeCalendarDay(response.data.calendarDays.remove),
                            navigateActions.navigate(-1),
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingRemove(true)),
                endWith(calendarDaysActions.setLoadingRemove(false)),
            )
        )
    );

export const calendarDaysRemoveRangeEpic: Epic<ReturnType<typeof calendarDaysActions.removeRangeAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('CALENDAR_DAYS_REMOVE_RANGE_ASYNC'),
        mergeMap(action =>
            from(client.mutate<CalendarDaysRemoveRangeData, CalendarDaysRemoveRangeVars>({
                mutation: CALENDAR_DAYS_REMOVE_RANGE_MUTATION,
                variables: {calendarDaysRemoveRangeInputType: action.payload}
            })).pipe(
                mergeMap(response =>
                    response.data
                        ? [
                            calendarDaysActions.removeCalendarDayByDates(response.data.calendarDays.removeRange.map(d => d.date)),
                            navigateActions.navigate(-1),
                        ]
                        : [notificationsActions.addError('Response is empty')]
                ),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(calendarDaysActions.setLoadingRemove(true)),
                endWith(calendarDaysActions.setLoadingRemove(false)),
            )
        )
    );

export const calendarDaysEpics = combineEpics(
    calendarDaysGetEpic,
    // @ts-ignore
    calendarDaysCreateEpic,
    calendarDaysCreateRangeEpic,
    calendarDaysUpdateEpic,
    calendarDaysRemoveEpic,
    calendarDaysRemoveRangeEpic
)