import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { UserType, UserInputType } from './User.type'
import { UserInputTypeInterface } from '../../types/User'
import { UpdateUser } from '../../domains/User/UpdateUserService'

export interface UpdateUserArgs {
    _id: number
    user: UserInputTypeInterface
}

export const updateUser = () => ({
    type: UserType,
    description: 'Updates a user on database',
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            required: true,
        },
        user: {
            type: new GraphQLNonNull(UserInputType),
            required: true,
        },
    },
    resolve: (_, args: UpdateUserArgs) => UpdateUser(args),
})
