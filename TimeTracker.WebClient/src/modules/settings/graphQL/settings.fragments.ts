import {gql} from "@apollo/client";

export const SETTINGS_EMPLOYMENT_FRAGMENT = gql`
    fragment SettingsEmploymentFragment on SettingsEmploymentType {
        fullTimeHoursInWorkday
        partTimeHoursInWorkday
    }
`

export const SETTINGS_APPLICATION_FRAGMENT = gql`
    fragment SettingsApplicationFragment on SettingsApplicationType {
        title
        faviconUrl
        logoUrl
    }
`

export const SETTINGS_TASKS_FRAGMENT = gql`
    fragment SettingsTasksFragment on SettingsTasksType {
        autoSetWorkingHoursForFullTimers {
            isEnabled
            timeWhenCreate
        }
        autoCreateDaysOff {
            isEnabled
            dayOfWeekWhenCreate
            timeWhenCreate
            daysOfWeek
        }
    }
`

export const SETTINGS_EMAIL_FRAGMENT = gql`
    fragment SettingsEmailFragment on SettingsEmailType {
        name
        address
    }
`

export const SETTINGS_FRAGMENT = gql`
    ${SETTINGS_EMPLOYMENT_FRAGMENT}
    ${SETTINGS_APPLICATION_FRAGMENT}
    ${SETTINGS_TASKS_FRAGMENT}
    ${SETTINGS_EMAIL_FRAGMENT}
    fragment SettingsFragment on SettingsType {
        id
        employment {
            ...SettingsEmploymentFragment
        }
        application {
            ...SettingsApplicationFragment
        }
        tasks {
            ...SettingsTasksFragment
        }
        email {
            ...SettingsEmailFragment
        }
        createdAt
        updatedAt
    }
`