import {combineEpics, Epic, ofType} from "redux-observable";
import {usersPageActions} from "./usersPage.actions";
import {RootState} from "../../../store/store";
import {catchError, debounce, debounceTime, endWith, from, map, merge, mergeMap, of} from "rxjs";
import {client} from "../../../graphQL/client";
import {GET_USERS_QUERY, GetUsersDataType, GetUsersInputType} from "../graphQL/users.queries";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {
    CreateUserData,
    CreateUserInputType,
    USERS_CREATE_MUTATION
} from "../graphQL/users.mutations";

export const getUsersEpic: Epic<ReturnType<typeof usersPageActions.getAsync>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('USER_PAGE_GET_ASYNC'),
        mergeMap(action =>
            from(client.query<GetUsersDataType, GetUsersInputType>({
                query: GET_USERS_QUERY,
                variables: {
                    FilterData: action.payload.filter,
                    skip: action.payload.skip,
                    take: action.payload.take,
                }
            })).pipe(
                mergeMap(response => [
                    usersPageActions.addUsers(response.data.users.get.entities),
                    usersPageActions.updateUsersMetrics(response.data.users.get.total,
                        response.data.users.get.pageSize)
                ])
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message)))
    )
}

export const getUsersForVocationsSelectEpic: Epic<ReturnType<typeof usersPageActions.fetchUsersForVocationsSelect>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('USER_PAGE_FETCH_USERS_FOR_VOCATIONS_SELECT'),
        debounceTime(100),
        mergeMap(action =>
            from(client.query<GetUsersDataType, GetUsersInputType>({
                query: GET_USERS_QUERY,
                variables: {
                    FilterData: action.payload.filter,
                    skip: action.payload.skip,
                    take: action.payload.take,
                }
            })).pipe(
                mergeMap(response => [
                    usersPageActions.addUsersForVocationsSelect(response.data.users.get.entities)
                ])
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message)))
    )
}

export const createUserEpic: Epic<ReturnType<typeof usersPageActions.createUser>,
    any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('USER_PAGE_CREATE_USER'),
        mergeMap(action =>
            from(client.mutate<CreateUserData, CreateUserInputType>({
                mutation: USERS_CREATE_MUTATION,
                variables: {
                    UserData: action.payload
                }
            })).pipe(
                mergeMap(response => [
                    notificationsActions.addSuccess("User was created!")
                ])
            )
        ),
        catchError(error => of(notificationsActions.addError(error.message))),
    )
}


// @ts-ignore
export const usersPageEpics = combineEpics(getUsersEpic, getUsersForVocationsSelectEpic, createUserEpic)
