import {gql} from '@apollo/client';
import {User, UserFilter} from "./users.types";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT} from "./users.fragments";
import {Permission} from "../../../graphQL/enums/Permission";

// Create user types and mutation
export type CreateUserData = { users: { create: User } }
export type CreateUserInput = {
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    permissions: Permission[],
    password: string,
    usersWhichCanApproveVocationRequestIds: [string]
}
export type CreateUserInputType = { UserData: CreateUserInput }

export const USERS_CREATE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation UsersCreate($UserData: UsersCreateInputType!){
        users {
            create (usersCreateInputType: $UserData){
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;

// Update user types and mutation
export type UpdateUserInput = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    permissions: Permission[],
    usersWhichCanApproveVocationRequestIds: [string]
}
export type UpdateUserInputType = { UpdateData: UpdateUserInput }
export type UpdatedUserDataResponse = { users: { update: User } }

export const USERS_UPDATE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation UpdateUser($UpdateData: UsersUpdateInputType!){
        users{
            update(usersUpdateInputType: $UpdateData){
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`

//Remove user types and mutation
export type RemoveUserInput = { email: string }
export type RemoveUserInputType = { RemoveData: RemoveUserInput }
export type RemoveUserDataResponse = { users: { remove: User } }

export const USERS_REMOVE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation RemoveUser($RemoveData: UsersRemoveInputType!){
        users{
            remove(usersRemoveInputType: $RemoveData){
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`
