import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserFilter} from "../graphQL/users.types";
import {CreateUserInput, RemoveUserInput, ResetUserPasswordInput, UpdateUserInput} from "../graphQL/users.mutations";

type InitialState = {
    users: User[],
    total: number,
    pageSize: number,
    currentPage: number,
    usersForVacation: User[],
    totalUsersForVacation: number,
    filter: UserFilter,
    usersLoading: boolean,
    usersForVacationLoading: boolean,
}

const initialState: InitialState = {
    users: [],
    total: 0,
    pageSize: 10,
    currentPage: 0,
    usersForVacation: [],
    totalUsersForVacation: 0,
    filter: {
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        permissions: [],
        roles: [],
        employments: []
    },
    usersLoading: false,
    usersForVacationLoading: false,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAsync: (state, action: PayloadAction<{ take: number, skip: number }>) => state,
        addUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        updateUsersMetrics: (state, action: PayloadAction<{ total: number, pageSize: number }>) => {
            state.total = action.payload.total;
            state.pageSize = action.payload.pageSize;
        },
        fetchUsersForVacationsSelect: (state, action: PayloadAction<{ filter: UserFilter, take: number, skip: number }>) => state,
        addUsersForVacationsSelect: (state, action: PayloadAction<{users: User[], total: number}>) => {
            action.payload.users.forEach((item) => state.usersForVacation.push(item))
            state.totalUsersForVacation = action.payload.total
        },
        createUser: (state, action: PayloadAction<CreateUserInput>) => state,
        removeUserAsync: (state, action: PayloadAction<RemoveUserInput>) => state,
        setFilter: (state, action: PayloadAction<UserFilter>) => {
            state.filter = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        updateUser: (state, action: PayloadAction<UpdateUserInput>) => state,
        resetUserPassword: (state, action: PayloadAction<ResetUserPasswordInput>) => state,
        setUsersForVacationLoading: (state, action: PayloadAction<boolean>) => {
            state.usersForVacationLoading = action.payload
        },
        clearUsersForVacationData: (state) => {
            state.usersForVacation = []
            state.totalUsersForVacation = 0
        }
    }
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
