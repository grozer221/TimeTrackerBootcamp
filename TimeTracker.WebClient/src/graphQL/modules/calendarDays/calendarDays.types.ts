export type CalendarDay = {
    id: string,
    date: string,
    kind: DayKind,
    percentageWorkHours: number,
    createdAt: string,
    updatedAt: string,
}

export enum DayKind {
    Workday = 'WORKDAY',
    DayOff = 'DAY_OFF',
    Holiday = 'HOLIDAY',
    ShortDay = 'SHORT_DAY'
}