import {gql} from "@apollo/client";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT} from "../../users/graphQL/users.fragments";

export const VACATION_REQUEST_FRAGMENT = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT}
    fragment VacationRequestFragment on VacationRequestType {
        id
        dateStart
        dateEnd
        comment
        status
        userId
        user {
            ...UserWithUsersWhichCanApproveVacationRequestsFragment
        }
        createdAt
        updatedAt
    }
`
