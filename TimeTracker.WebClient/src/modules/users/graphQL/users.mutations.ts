import {gql} from '@apollo/client';
import {User} from "./users.types";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT} from "./users.fragments";

export type UsersCreateData = { toDos: { create: User } }
export type UsersCreateVars = { toDosCreateInputType: UsersCreateInputType }
export type UsersCreateInputType = {}
export const USERS_CREATE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation UsersCreate{
        users {
            create {
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;

export type UsersUpdateData = { toDos: { update: User } }
export type UsersUpdateVars = { toDosUpdateInputType: UsersUpdateInputType }
export type UsersUpdateInputType = {
    id: number,
}
export const USERS_UPDATE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation UsersUpdate{
        users {
            update{
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;

export type UsersRemoveData = { users: { remove: User } }
export type UsersRemoveVars = { id: number }
export const USERS_REMOVE_MUTATION = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    mutation UsersRemove($id: Int!){
        users {
            remove(id: $id){
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;