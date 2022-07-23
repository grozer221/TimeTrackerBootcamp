import {gql} from '@apollo/client';

export const schema = gql`
    schema {
        query: Queries
        mutation: Mutations
    }

    type Queries {
        auth: AuthQueries!
        tracks: TracksQueries!
        users: UsersQueries!
        calendarDays: CalendarDaysQueries!
        settings: SettingsQueries!
        fileManager: FileManagerQueries!
    }

    type AuthQueries {
        me: AuthResponseType!
    }

    type AuthResponseType {
        user: UserType!
        token: String!
    }

    type UserType {
        id: Guid!
        createdAt: DateTime!
        updatedAt: DateTime!
        firstName: String
        lastName: String
        middleName: String
        email: String!
        role: Role!
        permissions: [Permission]!
        employment: Employment
    }

    scalar Guid

    """
    The \`DateTime\` scalar type represents a date and time. \`DateTime\` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
    """
    scalar DateTime

    enum Role {
        EMPLOYEE
        ADMINISTRATOR
    }

    enum Permission {
        UPDATE_USERS
        CONFIGURE_USERS_WHICH_CAN_APPROVE_VOCATION
        UPDATE_OTHERS_TIME_TRACKER
        NOTE_THE_ABSENCE_AND_VOCATION
        UPDATE_CALENDAR
        IMPERSONATE
        UPDATE_SETTINGS
        CLEAR_CACHE
        UPDATE_FILE_MANAGER
    }

    enum Employment {
        PART_TIME
        FULL_TIME
    }

    type TracksQueries {
        get(
            """
            Argument for a search
            """
            like: String!

            """
            Argument represent count of tracks on page
            """
            take: Int! = 0

            """
            Argument represnt page number
            """
            skip: Int! = 0
        ): GetTrackResponseType
        getById(
            """
            Id of track
            """
            id: Guid! = "00000000-0000-0000-0000-000000000000"
        ): TrackType
    }

    type GetTrackResponseType {
        entities: [TrackType]!
        total: Int!
        pageSize: Int!
    }

    type TrackType {
        id: Guid!
        createdAt: DateTime!
        updatedAt: DateTime!
        userId: Guid!
        title: String!
        description: String
        startTime: DateTime
        endTime: DateTime
    }

    type UsersQueries {
        get(
            """
            Argument for a search
            """
            like: String!

            """
            Argument represent count of tracks on page
            """
            take: Int! = 0

            """
            Argument represnt page number
            """
            skip: Int! = 0
        ): GetUserResponseType!
        getById(
            """
            Id of user
            """
            id: Guid! = "00000000-0000-0000-0000-000000000000"
        ): UserType!
    }

    type GetUserResponseType {
        entities: [UserType]!
        total: Int!
        pageSize: Int!
    }

    type CalendarDaysQueries {
        get(
            """
            Argument for get From calendar days
            """
            calendarDaysGetInputType: CalendarDaysGetInputType!
        ): [CalendarDayType]!
        getByDate(
            """
            Argument for get calendar day
            """
            date: Date! = "0001-01-01"
        ): CalendarDayType!
    }

    type CalendarDayType {
        id: Guid!
        createdAt: DateTime!
        updatedAt: DateTime!
        date: Date!
        title: String
        kind: DayKind!
        percentageWorkHours: Int!
    }

    """
    The \`Date\` scalar type represents a year, month and day in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard.
    """
    scalar Date

    enum DayKind {
        DAY_OFF
        HOLIDAY
        SHORT_DAY
    }

    input CalendarDaysGetInputType {
        from: Date!
        to: Date!
    }

    type SettingsQueries {
        get: SettingsType!
    }

    type SettingsType {
        id: Guid!
        createdAt: DateTime!
        updatedAt: DateTime!
        employment: SettingsEmploymentType!
        application: SettingsApplicationType!
        tasks: SettingsTasksType!
        email: SettingsEmailType!
    }

    type SettingsEmploymentType {
        fullTimeHoursInWorkday: Int!
        partTimeHoursInWorkday: [Int]!
    }

    type SettingsApplicationType {
        title: String
        faviconUrl: String
        logoUrl: String
    }

    type SettingsTasksType {
        autoSetWorkingHoursForFullTimers: SettingsTasksAutoSetWorkingHoursForFullTimersType
        autoCreateDaysOff: SettingsTasksAutoCreateDaysOffType
    }

    type SettingsTasksAutoSetWorkingHoursForFullTimersType {
        isEnabled: Boolean
        timeWhenCreate: TimeOnly
    }

    """
    The \`Time\` scalar type represents a time in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. Format is \`HH:mm:ss.FFFFFFF\`.
    """
    scalar TimeOnly

    type SettingsTasksAutoCreateDaysOffType {
        isEnabled: Boolean
        dayOfWeekWhenCreate: DayOfWeek
        timeWhenCreate: TimeOnly
        daysOfWeek: [DayOfWeek]
    }

    enum DayOfWeek {
        SUNDAY
        MONDAY
        TUESDAY
        WEDNESDAY
        THURSDAY
        FRIDAY
        SATURDAY
    }

    type SettingsEmailType {
        name: String
        address: String
    }

    type FileManagerQueries {
        getInFolder(
            """
            Argument for get in directory
            """
            folderPath: String!
        ): [FileManagerItemType]!
    }

    type FileManagerItemType {
        name: String!
        path: String
        createdAt: String
        kind: FileManagerItemKind!
        permissions: FileManagerItemPermissions!
    }

    enum FileManagerItemKind {
        FILE
        FOLDER
    }

    enum FileManagerItemPermissions {
        READ
        READ_AND_WRITE
    }

    type Mutations {
        auth: AuthMutations!
        tracks: TracksMutation!
        users: UsersMutations!
        calendarDays: CalendarDaysMutations!
        settings: SettingsMutations!
        cache: CacheMutations!
        fileManager: FileManagerMutations!
    }

    type AuthMutations {
        login(
            """
            Argument for login User
            """
            authLoginInputType: AuthLoginInputType!
        ): AuthResponseType!
        logout: Boolean!
        register(
            """
            Argument for register User
            """
            authRegisterInputType: AuthRegisterInputType!
        ): AuthResponseType!
        changePassword(
            """
            Argument for change User password
            """
            authChangePasswordInputType: AuthChangePasswordInputType!
        ): Boolean!
        impersonate(
            """
            Argument for Impersonate User
            """
            userId: Guid! = "00000000-0000-0000-0000-000000000000"
        ): AuthResponseType!
    }

    input AuthLoginInputType {
        email: String!
        password: String!
    }

    input AuthRegisterInputType {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        middleName: String!
    }

    input AuthChangePasswordInputType {
        oldPassword: String!
        newPassword: String!
    }

    type TracksMutation {
        create(
            """
            Argument for create track
            """
            trackInput: TrackInputType!
        ): TrackType!
        createOther(
            """
            Argument for create track
            """
            trackInput: TrackOtherInputType!
        ): TrackType!
        remove(
            """
            Id of track
            """
            id: Guid! = "00000000-0000-0000-0000-000000000000"
        ): String
        update(
            """
            Argument for update track
            """
            trackInput: TrackUpdateInputType!
        ): TrackType!
    }

    input TrackInputType {
        title: String!
        description: String
        startTime: DateTime
        endTime: DateTime
    }

    input TrackOtherInputType {
        userId: Guid!
        title: String!
        description: String
        startTime: DateTime!
        endTime: DateTime!
    }

    input TrackUpdateInputType {
        id: Guid!
        title: String!
        description: String
        startTime: DateTime
        endTime: DateTime
    }

    type UsersMutations {
        create(
            """
            Argument for create user
            """
            usersCreateInputType: UsersCreateInputType!
        ): UserType!
        update(
            """
            Argument for update user
            """
            usersUpdateInputType: UsersUpdateInputType!
        ): UserType!
        remove(
            """
            Argument for remove user
            """
            usersRemoveInputType: UsersRemoveInputType!
        ): UserType!
    }

    input UsersCreateInputType {
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        middleName: String!
        permissions: [Permission]!
    }

    input UsersUpdateInputType {
        id: Guid!
        email: String!
        firstName: String!
        lastName: String!
        middleName: String!
        permissions: [Permission]!
    }

    input UsersRemoveInputType {
        email: String!
    }

    type CalendarDaysMutations {
        create(
            """
            Argument for create calendar day
            """
            calendarDaysCreateInputType: CalendarDaysCreateInputType!
        ): CalendarDayType!
        createRange(
            """
            Argument for create calendar day
            """
            calendarDaysCreateRangeInputType: CalendarDaysCreateRangeInputType!
        ): [CalendarDayType]!
        update(
            """
            Argument for update calendar day
            """
            calendarDaysUpdateInputType: CalendarDaysUpdateInputType!
        ): CalendarDayType!
        remove(
            """
            Argument for remove calendar day
            """
            date: Date! = "0001-01-01"
        ): CalendarDayType!
        removeRange(
            """
            Argument for remove calendar day
            """
            calendarDaysRemoveRangeInputType: CalendarDaysRemoveRangeInputType!
        ): [CalendarDayType]!
    }

    input CalendarDaysCreateInputType {
        title: String
        date: Date!
        kind: DayKind!
        percentageWorkHours: Int!
        override: Boolean!
    }

    input CalendarDaysCreateRangeInputType {
        title: String
        from: Date!
        to: Date!
        daysOfWeek: [DayOfWeek]!
        kind: DayKind!
        percentageWorkHours: Int!
        override: Boolean!
    }

    input CalendarDaysUpdateInputType {
        id: Guid!
        title: String
        date: Date!
        kind: DayKind!
        percentageWorkHours: Int!
    }

    input CalendarDaysRemoveRangeInputType {
        from: Date!
        to: Date!
        daysOfWeek: [DayOfWeek]!
    }

    type SettingsMutations {
        updateEmployment(
            """
            Argument for update employment settings
            """
            settingsEmploymentUpdateInputType: SettingsEmploymentUpdateInputType!
        ): SettingsType!
        updateApplication(
            """
            Argument for update application settings
            """
            settingsApplicationUpdateInputType: SettingsApplicationUpdateInputType!
        ): SettingsType!
        updateTasks(
            """
            Argument for update tasks settings
            """
            settingsTasksUpdateInputType: SettingsTasksUpdateInputType!
        ): SettingsType!
        updateEmail(
            """
            Argument for update tasks settings
            """
            settingsEmailUpdateInputType: SettingsEmailUpdateInputType!
        ): SettingsType!
    }

    input SettingsEmploymentUpdateInputType {
        fullTimeHoursInWorkday: Int!
        partTimeHoursInWorkday: [Int]!
    }

    input SettingsApplicationUpdateInputType {
        title: String
        faviconUrl: String
        logoUrl: String
    }

    input SettingsTasksUpdateInputType {
        autoSetWorkingHoursForFullTimers: SettingsTasksAutoSetWorkingHoursForFullTimersInputType
        autoCreateDaysOff: SettingsTasksAutoCreateDaysOffInputType
    }

    input SettingsTasksAutoSetWorkingHoursForFullTimersInputType {
        isEnabled: Boolean!
        timeWhenCreate: TimeOnly
    }

    input SettingsTasksAutoCreateDaysOffInputType {
        isEnabled: Boolean!
        dayOfWeekWhenCreate: DayOfWeek
        timeWhenCreate: TimeOnly
        daysOfWeek: [DayOfWeek]
    }

    input SettingsEmailUpdateInputType {
        name: String!
        address: String!
    }

    type CacheMutations {
        refreshApp: Boolean!
    }

    type FileManagerMutations {
        createFolder(
            """
            Argument for get in directory
            """
            fileManagerCreateFolderInputType: FileManagerCreateFolderInputType!
        ): Boolean!
        uploadFiles(
            """
            Argument for update employment settings
            """
            fileManagerUploadFilesInputType: FileManagerUploadFilesInputType!
        ): [FileManagerItemType]!
        renameFile(
            """
            Argument for update employment settings
            """
            fileManagerRenameInputType: FileManagerRenameInputType!
        ): FileManagerItemType!
        remove(
            """
            Argument for update employment settings
            """
            fileManagerRemoveInputType: FileManagerRemoveInputType!
        ): Boolean!
    }

    input FileManagerCreateFolderInputType {
        folderPath: String!
        newFolderName: String!
    }

    input FileManagerUploadFilesInputType {
        folderPath: String!
        files: [Upload]!
    }

    """
    A meta type that represents a file upload.
    """
    scalar Upload

    input FileManagerRenameInputType {
        fromPath: String!
        toName: String!
    }

    input FileManagerRemoveInputType {
        path: String!
        kind: FileManagerItemKind!
    }
`