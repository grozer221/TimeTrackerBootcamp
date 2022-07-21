import {gql} from "@apollo/client";

export const FILE_MANAGER_ITEM_FRAGMENT = gql`
    fragment FileManagerItemFragment on FileManagerItemType {
        name
        path
        createdAt
        kind
    }
`