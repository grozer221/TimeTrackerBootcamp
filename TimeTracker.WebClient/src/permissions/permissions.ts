import {store} from "../store/store";
import {Role} from "../graphQL/enums/Role";
import {Permission} from "../graphQL/enums/Permission";

export const isAuthenticated = (): boolean => {
    return store.getState().auth.isAuth
}

export const isAdministrator = (): boolean => {
    const auth = store.getState().auth;
    return isAuthenticated() && auth.authedUser?.role === Role.Administrator
}

export const isHavePermission = (permissions: Permission[]): boolean => {
    const intersectedPermissions = store.getState().auth.authedUser?.permissions?.filter(p => permissions.includes(p));
    console.log(store.getState().auth.authedUser?.permissions, permissions, intersectedPermissions)
    return JSON.stringify(intersectedPermissions) === JSON.stringify(permissions);
}

export const isAdministratorOrHavePermissions = (permissions: Permission[]): boolean => {
    console.log(isAdministrator() || isHavePermission(permissions))
    return isAdministrator() || isHavePermission(permissions);
}