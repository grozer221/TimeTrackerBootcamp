import {Permission} from "../../enums/Permission";
import {Role} from "../../enums/Role";

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    role: Role,
    permissions: Permission[],
    amountHoursPerMonth: number,
    createdAt: string,
    updatedAt: string,
}