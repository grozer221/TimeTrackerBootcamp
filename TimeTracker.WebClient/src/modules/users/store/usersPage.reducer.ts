import {Reducer} from "redux";
import { User } from "../graphQL/users.types";
import {UserPageActionTypes} from "./usersPage.actions";

export const prefix = "USER_PAGE_"


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


export const userPageReducer: Reducer<InitialState, UserPageActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case "USER_PAGE_ADD_USERS":
            console.log("USERS ADDED")
            return {...state, users: action.payload.users}
        case "USER_PAGE_UPDATE_USERS_METRICS":
            return {...state, total: action.payload.total, pageSize: action.payload.pageSize}
        case "USER_PAGE_ADD_USERS_FOR_VOCATIONS_SELECT":
            return {...state, usersForVocation: action.payload.users}
        default:
            return state
    }
}

