const AUTH_TOKEN_KEY = 'rps-auth-token'

export const setAuthToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}
