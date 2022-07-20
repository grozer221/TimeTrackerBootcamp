import {gql} from '@apollo/client';

export type FilesUploadData = { files: { upload: string[] } }
export type FilesUploadVars = { filesUploadInputType: FilesUploadInputType }
export type FilesUploadInputType = {
    files: File[],
}
export const FILES_UPLOAD_MUTATION = gql`
    mutation FilesUpload($filesUploadInputType: FilesUploadInputType!){
        files {
            upload(filesUploadInputType: $filesUploadInputType)
        }
    }
`;