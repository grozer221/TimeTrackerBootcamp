import {Reducer} from "redux";
import {FileManagerActionTypes} from "./fileManager.actions";
import {FileManagerItem} from "../graphQL/fileManager.types";

type InitialState = {
    lastGotOnFolder: string,
    items: FileManagerItem[],
    loadingGetInFolder: boolean
    loadingCreateFolder: boolean,
    loadingUploadFiles: boolean,
}

const initialState: InitialState = {
    lastGotOnFolder: "",
    items: [],
    loadingGetInFolder: false,
    loadingCreateFolder: false,
    loadingUploadFiles: false,
}

export const fileManagerReducer: Reducer<InitialState, FileManagerActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'FILE_MANAGER_SET_LAST_GOT_IN_FOLDER':
            return {...state, lastGotOnFolder: action.payload};
        case 'FILE_MANAGER_SET_LOADING_GET_IN_FOLDER':
            return {...state, loadingGetInFolder: action.payload};
        case 'FILE_MANAGER_SET_ITEMS':
            return {...state, items: action.payload};

        case 'FILE_MANAGER_SET_LOADING_CREATE_FOLDER':
            return {...state, loadingCreateFolder: action.payload};

        case 'FILE_MANAGER_SET_LOADING_UPLOAD_FILES':
            return {...state, loadingUploadFiles: action.payload};
        default:
            return state;
    }
}