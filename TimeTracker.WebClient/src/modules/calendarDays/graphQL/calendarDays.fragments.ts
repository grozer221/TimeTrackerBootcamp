import {gql} from "@apollo/client";

export const CALENDAR_DAY_FRAGMENT = gql`
    fragment CalendarDayFragment on CalendarDayType {
        id
        date
        title
        kind
        percentageWorkHours
        createdAt
        updatedAt
    }
`