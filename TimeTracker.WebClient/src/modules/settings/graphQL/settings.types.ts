export type Settings = {
    id: string,
    common: SettingsCommon,
    createdAt: string,
    updatedAt: string,
}

export type SettingsCommon = {
    fullTimeHoursInWorkday: number,
}