import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FileManagerItem, FileManagerItemKind} from "../graphQL/fileManager.types";

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

export const fileManagerSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        setIsCreateFolderPageVisible: (state, action: PayloadAction<boolean>) => {
            state.isCreateFolderPageVisible = action.payload;
        },
        setIsUploadFilesPageVisible: (state, action: PayloadAction<boolean>) => {
            state.isUploadFilesPageVisible = action.payload;
        },
        setIsRenameFilePageVisible: (state, action: PayloadAction<boolean>) => {
            state.isRenameFilePageVisible = action.payload;
        },
        setFolderPath: (state, action: PayloadAction<string>) => {
            state.folderPath = action.payload;
        },
        getInFolderAsync: (state, action: PayloadAction<string>) => state,
        setLoadingGetInFolder: (state, action: PayloadAction<boolean>) => {
            state.loadingGetInFolder = action.payload
        },
        setItems: (state, action: PayloadAction<FileManagerItem[]>) => {
            state.items = action.payload
        },

        createFolderAsync: (state, action: PayloadAction<{folderPath: string, newFolderName: string}>) => state,
        setLoadingCreateFolder: (state, action: PayloadAction<boolean>) => {
            state.loadingCreateFolder = action.payload
        },

        uploadFilesAsync: (state, action: PayloadAction<{folderPath: string, files: File[]}>) => state,
        setLoadingUploadFiles: (state, action: PayloadAction<boolean>) => {
            state.loadingUploadFiles = action.payload
        },

        removeAsync: (state, action: PayloadAction<{path: string, kind: FileManagerItemKind}>) => state,
        setLoadingRemove: (state, action: PayloadAction<boolean>) => {
            state.loadingRemove = action.payload;
        },

        renameFileAsync: (state, action: PayloadAction<{fromPath: string, toName: string}>) => state,
        setLoadingRenameFile: (state, action: PayloadAction<boolean>) => {
            state.loadingRenameFile = action.payload;
        },

    },
})

export const fileManagerActions = fileManagerSlice.actions
export const fileManagerReducer = fileManagerSlice.reducer
