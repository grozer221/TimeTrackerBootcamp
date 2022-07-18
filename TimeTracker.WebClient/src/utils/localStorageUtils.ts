const TOKEN_KEY = 'TOKEN'

export const getJwtToken = (): string | null => localStorage.getItem(TOKEN_KEY)
export const setJwtToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token)
export const removeJwtToken = (): void => localStorage.removeItem(TOKEN_KEY)