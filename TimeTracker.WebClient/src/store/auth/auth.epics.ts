import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../store";
import {from, map, mergeMap} from "rxjs";
import {authActions} from "./auth.actions";
import {client} from "../../graphQL/client";
import {User} from "../../graphQL/modules/users/users.types";
import {USERS_CREATE_MUTATION} from "../../graphQL/modules/users/users.mutations";

export const fetchCreateTodosEpic: Epic<ReturnType<typeof authActions.userLoginAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOGIN_USER_ASYNC'),
        mergeMap(action =>
            from(client.mutate({mutation: USERS_CREATE_MUTATION})).pipe(
                map(response => authActions.setAuthedUser({} as User, '')),
            )
        )
    );

// @ts-ignore
export const authEpics = combineEpics(fetchCreateTodosEpic)