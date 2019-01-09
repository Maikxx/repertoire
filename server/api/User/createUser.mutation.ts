import { GraphQLNonNull } from 'graphql'
import { UserInputType, AuthType } from './User.type'
import { UserInputTypeInterface } from '../../types/User'
import { CreateUser } from '../../domains/User/CreateUserService'

export interface CreateUserArgs {
    user: UserInputTypeInterface
}

export const createUser = () => ({
    type: AuthType,
    args: {
        user: {
            type: new GraphQLNonNull(UserInputType),
            required: true,
        },
    },
    resolve: (_, args: CreateUserArgs) => CreateUser(args),
})
