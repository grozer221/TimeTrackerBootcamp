import {gql} from '@apollo/client';
import {User, UserFilter} from "./users.types";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT} from "./users.fragments";
import {Permission} from "../../../graphQL/enums/Permission";

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
export type CreateUserInputType = { UserData: CreateUserInput}

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

// export type UsersUpdateData = { toDos: { update: User } }
// export type UsersUpdateVars = { toDosUpdateInputType: UsersUpdateInputType }
// export type UsersUpdateInputType = {
//     id: number,
// }
// export const USERS_UPDATE_MUTATION = gql`
//     ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
//     mutation UsersUpdate{
//         users {
//             update{
//                 ...UserWithUsersWhichCanApproveVocationRequestsFragment
//             }
//         }
//     }
// `;
//
// export type UsersRemoveData = { users: { remove: User } }
// export type UsersRemoveVars = { id: number }
// export const USERS_REMOVE_MUTATION = gql`
//     ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
//     mutation UsersRemove($id: Int!){
//         users {
//             remove(id: $id){
//                 ...UserWithUsersWhichCanApproveVocationRequestsFragment
//             }
//         }
//     }
// `;