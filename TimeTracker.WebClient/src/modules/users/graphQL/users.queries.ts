import {gql} from '@apollo/client';
import {User} from "./users.types";
import {USER_FRAGMENT, USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT} from "./users.fragments";

export type UsersGetData = { toDos: { get: User[] } }
export type UsersGetVars = { like: string | null }
export const USERS_GET_QUERY = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    query UsersGet {
        users {
            get {
               ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;

export type UsersGetByIdData = { users: { getById: User } }
export type UsersGetByIdVars = { id: number, withCategory: boolean }
export const USERS_GET_BY_ID_QUERY = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    query UsersGetById($id: Int!){
        users {
            getById(id: $id){
                ...UserWithUsersWhichCanApproveVocationRequestsFragment
            }
        }
    }
`;
