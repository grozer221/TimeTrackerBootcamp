import {Claims} from "../modules/auth/graphQL/auth.types";

export const uppercaseToWords = (str: string): string => {
    const withSpaces = str.replace('_', ' ').toLowerCase()
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function nameof<T>(name: keyof T) {
    return name
}

export const parseJwt = (token: string): Claims => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const claims = JSON.parse(jsonPayload);
    return {
        id: claims.Id,
        email: claims.Email,
        permissions: JSON.parse(claims.Permissions),
        role: claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    };
}