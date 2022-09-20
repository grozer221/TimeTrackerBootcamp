import {gql} from '@apollo/client';
import {User, UserFilter} from "./users.types";
import {USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT} from "./users.fragments";
import {TRACK_FRAGMENT} from "../../timeTracker/graphQL/tracks.fragments";
import {Track} from "../../timeTracker/graphQL/tracks.types";

export type GetUsersDataType = { users: { get: { entities: User[], total: number, pageSize: number } } }
export type GetUsersInputType = { FilterData: UserFilter, take: number, skip: number }

export const GET_USERS_QUERY = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT}
    query GetUsers($FilterData: UserFilterType!, $take: Int!, $skip: Int! ){
        users{
            get(filter: $FilterData, take: $take, skip: $skip){
                entities{
                    ...UserWithUsersWhichCanApproveVacationRequestsFragment
                },
                total,
                pageSize
            }
        }
    }`

export type GetUserByEmailResponseType = { users: { getByEmail: User } }
export type GetUserByEmailInputType = { UserEmail: string }

export const GET_USER_BY_EMAIL_QUERY = gql`
    ${USER_WITH_USERS_WHICH_CAN_APPROVE_VACATION_REQUESTS_FRAGMENT}
    query GetUserByEmail($UserEmail: String!){
        users{
            getByEmail(email: $UserEmail){
                ...UserWithUsersWhichCanApproveVacationRequestsFragment
            }
        }
    }`

