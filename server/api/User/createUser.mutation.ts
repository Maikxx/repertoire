import { GraphQLNonNull } from 'graphql'
import { UserInputType, AuthType } from './User.type'
import { UserService } from '../../domains/User/UserService'

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
    resolve: (_, args) => {
        const userService = UserService()
        return userService.CreateUser(args)
    },
})
