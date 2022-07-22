import {Reducer} from "redux";
import { User } from "../graphQL/users.types";
import {UserPageActionTypes} from "./usersPage.actions";

export const prefix = "USER_PAGE_"


type InitialState = {
    users: User[],
    total: number,
    pageSize: number
}

const initialState: InitialState = {
    users: [],
    total: 0,
    pageSize: 10
}


export const userPageReducer: Reducer<InitialState, UserPageActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case "USER_PAGE_ADD_USERS":
            return {...state, users: action.payload.users}
        case "USER_PAGE_UPDATE_USERS_METRICS":
            return {...state, total: action.payload.total, pageSize: action.payload.pageSize}
        default:
            return state
    }
}

