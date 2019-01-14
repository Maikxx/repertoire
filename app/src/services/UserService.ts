import { removeToken } from './LocalStorageService'
import { routes } from '../views/routes'
import { History } from 'history'

export const logOut = (history: History) => {
    removeToken()
    history.push(routes.cover.login)
}
