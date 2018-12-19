import { AuthType, AuthInputType } from './User.type'
import { GraphQLNonNull } from 'graphql'
import { UserService } from '../../domains/User/UserService'

export interface AuthArgs {
    auth?: {
        email: string
        password: string
    }
}

export const userLogin = () => ({
    type: AuthType,
    description: 'Authenticate user',
    args: {
        auth: {
            type: new GraphQLNonNull(AuthInputType),
        },
    },
    resolve: (_, args: AuthArgs) => {
        const userService = UserService()
        return userService.UserLogin(args)
    },
})
