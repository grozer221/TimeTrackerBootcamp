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
        amountHoursPerMonth
        createdAt
        updatedAt
    }
`