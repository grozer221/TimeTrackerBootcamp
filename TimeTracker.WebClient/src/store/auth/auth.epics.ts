import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../store";
import {catchError, from, map, mergeMap} from "rxjs";
import {authActions} from "./auth.actions";
import {client} from "../../graphQL/client";
import {User} from "../../graphQL/modules/users/users.types";
import {
    AUTH_LOG_IN_MUTATION,
    AuthLoginData,
    AuthLoginInputType,
    AuthLoginVars, AUTH_LOG_OUT_MUTATION
} from "../../graphQL/modules/auth/auth.mutations";
import {ME_QUERY, MeData} from "../../graphQL/modules/auth/auth.query";

export const loginEpic: Epic<ReturnType<typeof authActions.userLoginAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOGIN_USER_ASYNC'),
        mergeMap(action =>
            from(client.mutate<AuthLoginData, AuthLoginVars>({
                mutation: AUTH_LOG_IN_MUTATION,
                variables: {authLoginInputType: action.payload.credentials}
            })).pipe(
                map(response => authActions.setAuthedUser(response.data?.auth.login.user as User,
                                                     response.data?.auth.login.token as string))
            )
        )
    );

export const meEpic: Epic<ReturnType<typeof authActions.meAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('ME_ASYNC'),
        mergeMap(action =>
            from(client.query<MeData>({
                query: ME_QUERY,
            })).pipe(
                map(response => {
                    if (!response.errors){
                        return authActions.setAuthedUser(response.data.auth.me.user as User,
                            response.data.auth.me.token as string)
                    }
                    return authActions.setAuthedUser(null, null)
                })
            )
        )
    );

export const logOutEpic: Epic<ReturnType<typeof authActions.logOutAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('LOG_OUT_ASYNC'),
        mergeMap(action =>
            from(client.mutate<MeData>({
                mutation: AUTH_LOG_OUT_MUTATION,
            })).pipe(
                map(response => {
                    if (!response.errors){
                        return authActions.setAuthedUser(null, null)
                    }
                })
            )
        )
    );


// @ts-ignore
export const authEpics = combineEpics(loginEpic, meEpic, logOutEpic)