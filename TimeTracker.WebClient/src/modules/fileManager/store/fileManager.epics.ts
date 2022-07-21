import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {fileManagerActions} from "./fileManager.actions";
import {
    FILE_MANAGER_GET_IN_FOLDER_QUERY,
    FileManagerGetInFolderData,
    FileManagerGetInFolderVars
} from "../graphQL/fileManager.queries";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {
    FILE_MANAGER_CREATE_FOLDER_MUTATION,
    FILE_MANAGER_UPLOAD_FILES_MUTATION,
    FileManagerCreateFolderData,
    FileManagerCreateFolderVars,
    FileManagerUploadFilesData,
    FileManagerUploadFilesVars
} from "../graphQL/fileManager.mutations";
import {navigateActions} from "../../navigate/store/navigate.actions";

export const getInFolderEpic: Epic<ReturnType<typeof fileManagerActions.getInFolderAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('FILE_MANAGER_GET_IN_FOLDER_ASYNC'),
        mergeMap(action =>
            from(client.query<FileManagerGetInFolderData, FileManagerGetInFolderVars>({
                query: FILE_MANAGER_GET_IN_FOLDER_QUERY,
                variables: {folderPath: action.payload}
            })).pipe(
                mergeMap(response => [
                    fileManagerActions.setLastGotInFolder(action.payload),
                    fileManagerActions.setItems(response.data.fileManager.getInFolder)
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(fileManagerActions.setLoadingGetInFolder(true)),
                endWith(fileManagerActions.setLoadingGetInFolder(false)),
            )
        )
    );

export const createFolderEpic: Epic<ReturnType<typeof fileManagerActions.createFolderAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('FILE_MANAGER_CREATE_FOLDER_ASYNC'),
        mergeMap(action =>
            from(client.mutate<FileManagerCreateFolderData, FileManagerCreateFolderVars>({
                mutation: FILE_MANAGER_CREATE_FOLDER_MUTATION,
                variables: {fileManagerCreateFolderInputType: action.payload}
            })).pipe(
                mergeMap(response => [
                    fileManagerActions.getInFolderAsync(state$.value.fileManager.lastGotOnFolder),
                    navigateActions.navigate(-1),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(fileManagerActions.setLoadingCreateFolder(true)),
                endWith(fileManagerActions.setLoadingCreateFolder(false)),
            )
        )
    );

export const uploadFilesEpic: Epic<ReturnType<typeof fileManagerActions.uploadFilesAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('FILE_MANAGER_UPLOAD_FILES_ASYNC'),
        mergeMap(action =>
            from(client.mutate<FileManagerUploadFilesData, FileManagerUploadFilesVars>({
                mutation: FILE_MANAGER_UPLOAD_FILES_MUTATION,
                variables: {fileManagerUploadFilesInputType: action.payload}
            })).pipe(
                mergeMap(response => [
                    fileManagerActions.getInFolderAsync(state$.value.fileManager.lastGotOnFolder),
                    navigateActions.navigate(-1),
                ]),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(fileManagerActions.setLoadingUploadFiles(true)),
                endWith(fileManagerActions.setLoadingUploadFiles(false)),
            )
        )
    );

export const fileManagerEpics = combineEpics(
    getInFolderEpic,
    // @ts-ignore
    createFolderEpic,
    uploadFilesEpic,
)