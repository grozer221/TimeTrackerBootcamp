import {gql} from '@apollo/client';
import {FILE_MANAGER_ITEM_FRAGMENT} from "./fileManager.fragments";

export type FileManagerCreateFolderData = { fileManager: { createFolder: boolean } }
export type FileManagerCreateFolderVars = { fileManagerCreateFolderInputType: FileManagerCreateFolderInputType }
export type FileManagerCreateFolderInputType = {
    folderPath: string,
    newFolderName: string,
}
export const FILE_MANAGER_CREATE_FOLDER_MUTATION = gql`
    mutation FileManagerCreateFolder($fileManagerCreateFolderInputType: FileManagerCreateFolderInputType!) {
        fileManager {
            createFolder(fileManagerCreateFolderInputType: $fileManagerCreateFolderInputType)
        }
    }
`;


export type FileManagerUploadFilesData = { fileManager: { createFolder: boolean } }
export type FileManagerUploadFilesVars = { fileManagerUploadFilesInputType: FileManagerUploadFilesInputType }
export type FileManagerUploadFilesInputType = {
    folderPath: string,
    files: File[],
}
export const FILE_MANAGER_UPLOAD_FILES_MUTATION = gql`
    ${FILE_MANAGER_ITEM_FRAGMENT}
    mutation FileManagerUploadFiles($fileManagerUploadFilesInputType: FileManagerUploadFilesInputType!) {
        fileManager {
            uploadFiles(fileManagerUploadFilesInputType: $fileManagerUploadFilesInputType) {
                ...FileManagerItemFragment
            }
        }
    }
`;