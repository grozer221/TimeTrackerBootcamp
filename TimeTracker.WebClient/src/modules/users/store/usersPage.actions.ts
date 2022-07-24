import {prefix} from "./usersPage.reducer";
import {User, UserFilter} from "../graphQL/users.types";
import {ValueOf} from "../../../store/store";
import {CreateUserInput, CreateUserInputType} from "../graphQL/users.mutations";


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
    } as const),
    fetchUsersForVocationsSelect: (email: string) => {
        let filter: UserFilter = {
            email: email,
            permissions: [],
            roles:[]
        }
        return {
            type: `${prefix}FETCH_USERS_FOR_VOCATIONS_SELECT`,
            payload: {filter, take: 100, skip: 0}
        } as const
    },
    addUsersForVocationsSelect: (users: User[]) => ({
        type: `${prefix}ADD_USERS_FOR_VOCATIONS_SELECT`,
        payload: {users}
    } as const),
    createUser: (user: CreateUserInput) => ({
        type: `${prefix}CREATE_USER`,
        payload: user
    } as const)
}

export type UserPageActionCreatorTypes = ValueOf<typeof usersPageActions>;
export type UserPageActionTypes = ReturnType<UserPageActionCreatorTypes>;
