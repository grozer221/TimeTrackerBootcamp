import {User} from "../../graphQL/modules/users/users.types";
import {ValueOf} from "../store";

export const authActions = {
    userLoginAsync: () => ({
        type: 'LOGIN_USER_ASYNC',
        payload: null,
    } as const),
    setAuthedUser: (user: User, token: string) => ({
        type: 'SET_AUTHED_USER',
        payload: {user, token},
    } as const),
};

export type UsersActionCreatorTypes = ValueOf<typeof authActions>;
export type UsersActionTypes = ReturnType<UsersActionCreatorTypes>;
