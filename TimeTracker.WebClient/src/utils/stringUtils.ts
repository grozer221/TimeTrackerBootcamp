export const uppercaseToWords = (str: string): string => {
    const withSpaces = str.replace('_', ' ').toLowerCase()
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}