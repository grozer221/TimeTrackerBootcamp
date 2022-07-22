import {ValueOf} from "../../../store/store";
import {FileManagerItem, FileManagerItemKind} from "../graphQL/fileManager.types";

export const prefix = 'FILE_MANAGER_';

export const fileManagerActions = {
    setIsCreateFolderPageVisible: (visible: boolean) => ({
        type: `${prefix}SET_IS_CREATE_FOLDER_PAGE_VISIBLE`,
        payload: visible,
    } as const),
    setIsUploadFilesPageVisible: (visible: boolean) => ({
        type: `${prefix}SET_IS_UPLOAD_FILES_PAGE_VISIBLE`,
        payload: visible,
    } as const),
    setIsRenameFilePageVisible: (visible: boolean) => ({
        type: `${prefix}SET_IS_RENAME_FILE_PAGE_VISIBLE`,
        payload: visible,
    } as const),

    setFolderPath: (folderPath: string) => ({
        type: `${prefix}SET_FOLDER_PATH`,
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

    removeAsync: (path: string, kind: FileManagerItemKind) => ({
        type: `${prefix}REMOVE_ASYNC`,
        payload: {path, kind},
    } as const),
    setLoadingRemove: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_REMOVE`,
        payload: loading,
    } as const),

    renameFileAsync: (fromPath: string, toName: string) => ({
        type: `${prefix}RENAME_FILE_ASYNC`,
        payload: {fromPath, toName},
    } as const),
    setLoadingRenameFile: (loading: boolean) => ({
        type: `${prefix}SET_LOADING_RENAME_FILE`,
        payload: loading,
    } as const),
};

export type FileManagerActionCreatorTypes = ValueOf<typeof fileManagerActions>;
export type FileManagerActionTypes = ReturnType<FileManagerActionCreatorTypes>;
