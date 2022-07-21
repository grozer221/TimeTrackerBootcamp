import {ValueOf} from "../../../store/store";
import {FileManagerItem} from "../graphQL/fileManager.types";

export const prefix = 'FILE_MANAGER_';

export const fileManagerActions = {
    setLastGotInFolder: (folderPath: string) => ({
        type: `${prefix}SET_LAST_GOT_IN_FOLDER`,
        payload: folderPath,
    } as const),
    getInFolderAsync: (folderPath: string) => ({
        type: `${prefix}GET_IN_FOLDER_ASYNC`,
        payload: folderPath,
    } as const),
    setLoadingGetInFolder: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_GET_IN_FOLDER`,
        payload: loading,
    } as const),
    setItems: (items: FileManagerItem[]) => ({
        type: `${prefix}SET_ITEMS`,
        payload: items,
    } as const),

    createFolderAsync: (folderPath: string, newFolderName: string) => ({
        type: `${prefix}CREATE_FOLDER_ASYNC`,
        payload: {folderPath, newFolderName},
    } as const),
    setLoadingCreateFolder: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_CREATE_FOLDER`,
        payload: loading,
    } as const),

    uploadFilesAsync: (folderPath: string, files: File[]) => ({
        type: `${prefix}UPLOAD_FILES_ASYNC`,
        payload: {folderPath, files},
    } as const),
    setLoadingUploadFiles: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_UPLOAD_FILES`,
        payload: loading,
    } as const),
};

export type FileManagerActionCreatorTypes = ValueOf<typeof fileManagerActions>;
export type FileManagerActionTypes = ReturnType<FileManagerActionCreatorTypes>;
