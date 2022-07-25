import {gql} from '@apollo/client';
import {User, UserFilter} from "./users.types";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT} from "./users.fragments";

export type GetUsersDataType = { users: { get: { entities: User[], total: number, pageSize: number } } }
export type GetUsersInputType = { FilterData: UserFilter, take: number, skip: number }

export const GET_USERS_QUERY = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VOCATION_REQUESTS_FRAGMENT}
    query GetUsers($FilterData: UserFilterType!, $take: Int!, $skip: Int! ){
        users{
            get(filter: $FilterData, take: $take, skip: $skip){
                entities{
                    ...UserWithUsersWhichCanApproveVocationRequestsFragment
                },
                total,
                pageSize
            }
        }
    }`