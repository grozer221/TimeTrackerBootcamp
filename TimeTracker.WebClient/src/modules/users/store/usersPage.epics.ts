// import {combineEpics, Epic, ofType} from "redux-observable";
// import {calendarDaysActions} from "../../../calendarDays/store/calendarDays.actions";
// import {RootState} from "../../../../store/store";
// import {usersPageActions} from "./usersPage.actions";
// import {catchError, from, map, merge, mergeMap, of} from "rxjs";
// import {client} from "../../../../graphQL/client";
// import {GET_USERS_QUERY, GetUsersDataType, GetUsersInputType} from "../../graphQL/users.queries";
// import { notificationsActions } from "../../../notifications/store/notifications.actions";


import {combineEpics, Epic, ofType} from "redux-observable";
import {usersPageActions} from "./usersPage.actions";
import {RootState} from "../../../store/store";
import {catchError, from, map, merge, mergeMap, of} from "rxjs";
import {client} from "../../../graphQL/client";
import {GET_USERS_QUERY, GetUsersDataType, GetUsersInputType} from "../graphQL/users.queries";
import {notificationsActions} from "../../notifications/store/notifications.actions";

export const getUsersEpic: Epic<ReturnType<typeof usersPageActions.getAsync>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('USER_PAGE_GET_ASYNC'),
        mergeMap(action => {
            const request = from(client.query<GetUsersDataType, GetUsersInputType>({
                query: GET_USERS_QUERY,
                variables: {
                    FilterData: action.payload.filter,
                    skip: action.payload.skip,
                    take: action.payload.take,
                }
            }))

            const addUsers = request.pipe(map(response => usersPageActions.addUsers(response.data.users.get.entities)))
            const updateMetrics = request.pipe(map(response =>
                usersPageActions.updateUsersMetrics(response.data.users.get.total,
                    response.data.users.get.pageSize)))
            return merge(addUsers, updateMetrics)
        }),
        catchError(error => of(notificationsActions.addError(error.message)))
    )
}

export const usersPageEpics = combineEpics(getUsersEpic)
