import {Permission} from "../../../graphQL/enums/Permission";
import {Role} from "../../../graphQL/enums/Role";

export type Claims = {
    id: string,
    email: string,
    permissions: Permission[]
    role: Role
}