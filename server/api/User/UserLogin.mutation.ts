import { AuthType, AuthInputType } from './User.type'
import { GraphQLNonNull } from 'graphql'
import { UserLogin } from '../../domains/User/UserLoginService'

export interface AuthArgs {
    auth: {
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
        return UserLogin(args)
    },
})
