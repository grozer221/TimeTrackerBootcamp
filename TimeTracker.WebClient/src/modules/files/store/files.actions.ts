import {ValueOf} from "../../../store/store";

export const prefix = 'FILES_';

export const filesActions = {
    addLoadingUpload: (currentComponentKey: string) => ({
        type: `${prefix}ADD_LOADING_UPLOAD`,
        payload: currentComponentKey,
    } as const),
    removeLoadingUpload: (currentComponentKey: string) => ({
        type: `${prefix}REMOVE_LOADING_UPLOAD`,
        payload: currentComponentKey,
    } as const),

    uploadAsync: (files: File[], currentComponentKey: string) => ({
        type: `${prefix}UPLOAD_ASYNC`,
        payload: {files, currentComponentKey},
    } as const),
    addUploadedFiles: (files: string[], currentComponentKey: string) => ({
        type: `${prefix}ADD_UPLOADED_FILES`,
        payload: {files, currentComponentKey},
    } as const),
    removeUploadedFiles: (currentComponentKey: string) => ({
        type: `${prefix}REMOVE_UPLOADED_FILES`,
        payload: currentComponentKey,
    } as const),
};

export type FilesUploadActionCreatorTypes = ValueOf<typeof filesActions>;
export type FilesUploadActionTypes = ReturnType<FilesUploadActionCreatorTypes>;
