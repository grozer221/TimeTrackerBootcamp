import {gql} from "@apollo/client";

export const USER_FRAGMENT = gql`
    fragment UserFragment on UserType {
        id
        firstName
        lastName
        middleName
        email
        employment
        role
        permissions
        createdAt
        updatedAt
    }
`

export const USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT = gql`
    ${USER_FRAGMENT}
    fragment UserWithUsersWhichCanApproveVocationRequestsFragment on UserType {
        ...UserFragment
        usersWhichCanApproveVocationRequest {
            ...UserFragment
        }
    }
`