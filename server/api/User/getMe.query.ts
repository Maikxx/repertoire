import { UserType } from './User.type'
import { ApolloError } from 'apollo-server-express'
import { GetMe } from '../../domains/User/CurrentUserService'

export const getMe = () => ({
    type: UserType,
    resolve: async (_, args, { user }) => {
        if (!user) {
            throw new ApolloError('You are not authenticated', '403')
        }

        const { id } = user
        return GetMe(id)
    },
})
