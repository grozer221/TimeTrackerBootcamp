import {gql} from "@apollo/client";
import {USER_FRAGMENT} from "../../users/graphQL/users.fragments";

export const VACATION_REQUEST_FRAGMENT = gql`
    ${USER_FRAGMENT}
    fragment VacationRequestFragment on VacationRequestType {
        id
        dateStart
        dateEnd
        comment
        status
        userId
        user {
            ...UserFragment
        }
        createdAt
        updatedAt
    }
`
