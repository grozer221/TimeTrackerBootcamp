import {DayOfWeek} from "../../../graphQL/enums/DayOfWeek";

export type Settings = {
    id: string,
    employment: SettingsEmployment,
    application: SettingsApplication,
    tasks: SettingsTasks,
    createdAt: string,
    updatedAt: string,
}

export type SettingsEmployment = {
    fullTimeHoursInWorkday: number,
    partTimeHoursInWorkday: number[],
}

export type SettingsApplication = {
    title?: string,
    faviconUrl?: string,
    logoUrl?: string,
}

export type SettingsTasks = {
    autoSetWorkingHoursForFullTimers: SettingsTasks_AutoSetWorkingHoursForFullTimers,
    autoCreateDaysOff: SettingsTasks_AutoCreateDaysOff,
}

export type SettingsTasks_AutoCreateDaysOff = {
    isEnabled: boolean,
    dayOfWeekWhenCreate: DayOfWeek,
    timeWhenCreate: string,
    daysOfWeek: DayOfWeek[],
}

export type SettingsTasks_AutoSetWorkingHoursForFullTimers = {
    isEnabled: boolean,
    timeWhenCreate: string,
}