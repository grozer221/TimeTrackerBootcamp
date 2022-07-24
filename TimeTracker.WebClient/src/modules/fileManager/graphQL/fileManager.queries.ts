import {gql} from '@apollo/client';
import {FILE_MANAGER_ITEM_FRAGMENT} from "./fileManager.fragments";
import {FileManagerItem} from "./fileManager.types";

export type FileManagerGetInFolderData = { fileManager: { getInFolder: FileManagerItem[] } }
export type FileManagerGetInFolderVars = { folderPath: string }
export const FILE_MANAGER_GET_IN_FOLDER_QUERY = gql`
    ${FILE_MANAGER_ITEM_FRAGMENT}
    query FileManagerGetInFolder($folderPath: String!) {
        fileManager {
            getInFolder(folderPath: $folderPath) {
                ...FileManagerItemFragment
            }
        }
    }

`;