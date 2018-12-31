import { UserType } from './User.type'
import { GetUsers } from '../../domains/User/GetUsersService'

export const getUsers = () => ({
    type: UserType,
    resolve: async () => {
        return GetUsers()
    },
})
