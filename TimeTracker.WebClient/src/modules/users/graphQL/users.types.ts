import {Permission} from "../../../graphQL/enums/Permission";
import {Role} from "../../../graphQL/enums/Role";
import {Employment} from "../../../graphQL/enums/Employment";

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    employment: Employment,
    role: Role,
    permissions: Permission[],
    createdAt: string,
    updatedAt: string,
    usersWhichCanApproveVacationRequest: User[]
}

export type UserFilter = {
    firstName?: string,
    lastName?: string,
    middleName?: string,
    email?: string,
    employments?: Employment[],
    permissions?: Permission[],
    roles?: Role[]
}