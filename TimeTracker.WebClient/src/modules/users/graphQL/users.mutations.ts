import {gql} from '@apollo/client';
import {User} from "./users.types";
import {USER_FRAGMENT} from "./users.fragments";

export type UsersCreateData = { toDos: { create: User } }
export type UsersCreateVars = { toDosCreateInputType: UsersCreateInputType}
export type UsersCreateInputType = {}
export const USERS_CREATE_MUTATION = gql`
    ${USER_FRAGMENT}
    mutation UsersCreate{
        users {
            create{
                ...UserFragment
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
    ${USER_FRAGMENT}
    mutation UsersUpdate{
        users {
            update{
                ...UserFragment
            }
        }
    }
`;

export type UsersRemoveData = { users: { remove: User } }
export type UsersRemoveVars = { id: number }
export const USERS_REMOVE_MUTATION = gql`
    ${USER_FRAGMENT}
    mutation UsersRemove($id: Int!){
        users {
            remove(id: $id){
                ...UserFragment
            }
        }
    }
`;