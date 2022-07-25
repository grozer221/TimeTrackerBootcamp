import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserFilter} from "../graphQL/users.types";
import {CreateUserInput} from "../graphQL/users.mutations";

type InitialState = {
    users: User[],
    total: number,
    pageSize: number,
    usersForVocation: User[],
}

const initialState: InitialState = {
    users: [],
    total: 0,
    pageSize: 10,
    usersForVocation: []
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getAsync: (state, action: PayloadAction<{filter: UserFilter, take: number, skip: number}>) => state,
        addUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        updateUsersMetrics: (state, action: PayloadAction<{total: number, pageSize: number}>) => {
            state.total = action.payload.total;
            state.pageSize = action.payload.pageSize;
        },
        fetchUsersForVocationsSelect: (state, action: PayloadAction<{filter: UserFilter, take: number, skip: number}>) => state,
        addUsersForVocationsSelect: (state, action: PayloadAction<User[]>) => {
            state.usersForVocation = action.payload;
        },
        createUser: (state, action: PayloadAction<CreateUserInput>) => state,
    },
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
