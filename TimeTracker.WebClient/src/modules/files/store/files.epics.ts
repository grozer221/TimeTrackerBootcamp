import {combineEpics, Epic, ofType} from "redux-observable";
import {RootState} from "../../../store/store";
import {catchError, endWith, from, mergeMap, of, startWith} from "rxjs";
import {client} from "../../../graphQL/client";
import {filesActions} from "./files.actions";
import {notificationsActions} from "../../notifications/store/notifications.actions";
import {FILES_UPLOAD_MUTATION, FilesUploadData, FilesUploadVars} from "../graphQL/files.mutations";

export const filesUploadEpic: Epic<ReturnType<typeof filesActions.uploadAsync>, any, RootState> = (action$, state$) =>
    action$.pipe(
        ofType('FILES_UPLOAD_ASYNC'),
        mergeMap(action =>
            from(client.mutate<FilesUploadData, FilesUploadVars>({
                mutation: FILES_UPLOAD_MUTATION,
                variables: {
                    filesUploadInputType: {
                        files: action.payload.files
                    },
                },
            })).pipe(
                mergeMap(response => {
                    return response.data
                        ? [
                            filesActions.addUploadedFiles(response.data.files.upload, action.payload.currentComponentKey),
                            notificationsActions.addSuccess('File successfully uploaded'),
                        ]
                        : [notificationsActions.addError('Empty response')]
                }),
                catchError(error => of(notificationsActions.addError(error.message))),
                startWith(filesActions.addLoadingUpload(action.payload.currentComponentKey)),
                endWith(filesActions.removeLoadingUpload(action.payload.currentComponentKey)),
            )
        )
    );

export const filesEpics = combineEpics(
    filesUploadEpic,
)