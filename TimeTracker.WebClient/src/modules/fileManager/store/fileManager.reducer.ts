import {Reducer} from "redux";
import {FileManagerActionTypes} from "./fileManager.actions";
import {FileManagerItem} from "../graphQL/fileManager.types";

type InitialState = {
    folderPath: string,
    isCreateFolderPageVisible: boolean,
    isUploadFilesPageVisible: boolean,
    isRenameFilePageVisible: boolean,
    items: FileManagerItem[],
    loadingGetInFolder: boolean
    loadingCreateFolder: boolean,
    loadingUploadFiles: boolean,
    loadingRenameFile: boolean,
    loadingRemove: boolean,
}

const initialState: InitialState = {
    folderPath: '',
    isCreateFolderPageVisible: false,
    isUploadFilesPageVisible: false,
    isRenameFilePageVisible: false,
    items: [],
    loadingGetInFolder: false,
    loadingCreateFolder: false,
    loadingUploadFiles: false,
    loadingRenameFile: false,
    loadingRemove: false,
}

export const fileManagerReducer: Reducer<InitialState, FileManagerActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'FILE_MANAGER_SET_IS_CREATE_FOLDER_PAGE_VISIBLE':
            return {...state, isCreateFolderPageVisible: action.payload};
        case 'FILE_MANAGER_SET_IS_UPLOAD_FILES_PAGE_VISIBLE':
            return {...state, isUploadFilesPageVisible: action.payload};
        case 'FILE_MANAGER_SET_IS_RENAME_FILE_PAGE_VISIBLE':
            return {...state, isRenameFilePageVisible: action.payload};

        case 'FILE_MANAGER_SET_FOLDER_PATH':
            return {...state, folderPath: action.payload};
        case 'FILE_MANAGER_SET_LOADING_GET_IN_FOLDER':
            return {...state, loadingGetInFolder: action.payload};
        case 'FILE_MANAGER_SET_ITEMS':
            return {...state, items: action.payload};

        case 'FILE_MANAGER_SET_LOADING_CREATE_FOLDER':
            return {...state, loadingCreateFolder: action.payload};

        case 'FILE_MANAGER_SET_LOADING_UPLOAD_FILES':
            return {...state, loadingUploadFiles: action.payload};

        case 'FILE_MANAGER_SET_LOADING_REMOVE':
            return {...state, loadingRemove: action.payload};

        case 'FILE_MANAGER_SET_LOADING_RENAME_FILE':
            return {...state, loadingRenameFile: action.payload};
        default:
            return state;
    }
}