import {Reducer} from "redux";
import {NavigateActionTypes} from "./navigate.actions";
import {To} from "history";

type InitialState = {
    to: To | number | null,
}

const initialState: InitialState = {
    to: null,
}

export const navigateReducer: Reducer<InitialState, NavigateActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'NAVIGATE_NAVIGATE':
            return {...state, to: action.payload};
        case 'NAVIGATE_REMOVE_NAVIGATE':
            return {...state, to: null};
        default:
            return state;
    }
}