import { removeToken } from './LocalStorageService'
import { routes } from '../views/routes'

export const logOut = (history: any) => {
    removeToken()
    history.push(routes.cover.login)
}
