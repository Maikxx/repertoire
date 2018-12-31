import { GraphQLNonNull } from 'graphql'
import { UserInputType, AuthType } from './User.type'
import { UserInputTypeInterface } from '../../types/User'
import { CreateUser } from '../../domains/User/CreateUserService'

export interface CreateUserArgs {
    user: UserInputTypeInterface
}

export const createUser = () => ({
    type: AuthType,
    description: 'Create a user on database',
    args: {
        user: {
            type: new GraphQLNonNull(UserInputType),
            description: 'The input type required to create a user, includes email and password',
            required: true,
        },
    },
    resolve: (_, args: CreateUserArgs) => {
        return CreateUser(args)
    },
})
