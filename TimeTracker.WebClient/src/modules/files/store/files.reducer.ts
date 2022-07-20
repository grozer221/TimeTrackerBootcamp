import {Reducer} from "redux";
import {FilesUploadActionTypes} from "./files.actions";

type FileType = {
    files: string[],
    currentComponentKey: string,
}

type InitialState = {
    loadingUpload: string[],
    uploadedFiles: FileType[],
}

const initialState: InitialState = {
    loadingUpload: [],
    uploadedFiles: [],
}

export const filesReducer: Reducer<InitialState, FilesUploadActionTypes> = (state = initialState, action): InitialState => {
    switch (action.type) {
        case 'FILES_ADD_LOADING_UPLOAD':
            return {...state, loadingUpload: [...state.loadingUpload, action.payload]};
        case 'FILES_REMOVE_LOADING_UPLOAD':
            return {...state, loadingUpload: state.loadingUpload.filter(l => l !== action.payload)};

        case 'FILES_ADD_UPLOADED_FILES':
            return {...state, uploadedFiles: [...state.uploadedFiles, action.payload]};
        case 'FILES_REMOVE_UPLOADED_FILES':
            return {...state, uploadedFiles: state.uploadedFiles.filter(f => f.currentComponentKey !== action.payload)};
        default:
            return state;
    }
}