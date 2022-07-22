import {prefix} from "./usersPage.reducer";
import {User, UserFilter} from "../graphQL/users.types";
import {ValueOf} from "../../../store/store";


export const usersPageActions = {
    getAsync: (filter: UserFilter, take: number, skip: number) => ({
        type: `${prefix}GET_ASYNC`,
        payload: {filter, take, skip}
    } as const),
    addUsers: (users: User[]) => ({
        type: `${prefix}ADD_USERS`,
        payload: {users}
    } as const),
    updateUsersMetrics: (total: number, pageSize: number) => ({
        type: `${prefix}UPDATE_USERS_METRICS`,
        payload: {total, pageSize}
    } as const)
}

export type UserPageActionCreatorTypes = ValueOf<typeof usersPageActions>;
export type UserPageActionTypes = ReturnType<UserPageActionCreatorTypes>;
