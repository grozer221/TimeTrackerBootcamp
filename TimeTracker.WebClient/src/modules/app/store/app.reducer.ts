import {Reducer} from "redux";
import {AppActionTypes} from "./app.actions";

type InitialState = {
    initialised: boolean,
}

const initialState: InitialState = {
    initialised: false,
}

export const appReducer: Reducer<InitialState, AppActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'APP_SET_INITIALISED':
            return {...state, initialised: action.payload};
        default:
            return state;
    }
}