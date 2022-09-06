import {gql} from '@apollo/client';
import {STATISTIC_FRAGMENT} from "./statistic.fragment";
import {Statistic} from "./statistic.type";

export type GetStatisticData = {statistic: {getUserStatistic: Statistic}}
export type GetStatisticInputType = { UserId: string, Date: string }

export const GET_USER_STATISTIC = gql`
    ${STATISTIC_FRAGMENT}
    query GetUserStatistic($UserId: Guid!, $Date:DateTime!){
        statistic{
            getUserStatistic(userId: $UserId, date: $Date){
                ...StatisticFragment
            }
        }
    }
`