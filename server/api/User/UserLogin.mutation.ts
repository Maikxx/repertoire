import { UserTokenType } from './User.type'
import { UserService } from '../../domains/User/UserService'
import { GraphQLString } from 'graphql'

export interface UserLoginArgs {
    email: string
    password: string
}

export const userLogin = () => ({
    type: UserTokenType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (root, args: UserLoginArgs) => {
        const userService = UserService()

        const userToken = await userService.UserLogin(args)
        return userToken
    },
})
