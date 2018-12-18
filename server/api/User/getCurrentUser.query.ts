import { UserType } from './User.type'
import { UserService } from '../../domains/User/UserService'

export const getCurrentUser = () => ({
    type: UserType,
    resolve: async (root, args) => {
        const userService = UserService()

        const user = await userService.GetCurrentUser()
        return user
    },
})
