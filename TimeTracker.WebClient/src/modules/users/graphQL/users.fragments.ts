import {gql} from "@apollo/client";

export const USER_FRAGMENT = gql`
    fragment UserFragment on UserType {
        id
        firstName
        lastName
        middleName
        email
        role
        permissions
        createdAt
        updatedAt
    }
`

export const USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT = gql`
    ${USER_FRAGMENT}
    fragment UserWithUsersWhichCanApproveVacationRequestsFragment on UserType {
        ...UserFragment
        usersWhichCanApproveVacationRequest {
            ...UserFragment
        }
    }
`