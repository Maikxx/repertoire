import { UserService } from '../../domains/User/UserService'
import { UserType } from './User.type'

export const getUsers = () => ({
    type: UserType,
    resolve: async (_, args) => {
        const userService = UserService()

        const users = await userService.GetUsers()
        return users
    },
})
