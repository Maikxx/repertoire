import { UserService } from '../../domains/User/UserService'
import { UserType } from './User.type'
import { ApolloError } from 'apollo-server-express'

export const getMe = () => ({
    type: UserType,
    resolve: async (_, args, { user }) => {
        if (!user) {
            throw new ApolloError('You are not authenticated', '403')
        }

        const userService = UserService()
        const { id } = user

        const me = await userService.GetMe(id)
        return me
    },
})
