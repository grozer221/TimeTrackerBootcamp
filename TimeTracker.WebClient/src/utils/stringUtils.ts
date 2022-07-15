export const uppercaseToWords = (str: string): string => {
    const withSpaces = str.replace('_', ' ').toLowerCase()
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}