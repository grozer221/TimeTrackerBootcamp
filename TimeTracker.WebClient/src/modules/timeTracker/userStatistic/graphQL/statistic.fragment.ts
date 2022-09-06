import {gql} from "@apollo/client";

export const STATISTIC_FRAGMENT = gql`
    fragment StatisticFragment on StatisticType {
        id
        createdAt
        updatedAt
        workerHours
        monthHours
  }
`