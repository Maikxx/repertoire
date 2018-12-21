import { GraphQLNonNull } from 'graphql'
import { UserType, UserInputType } from './User.type'
import { UserService } from '../../domains/User/UserService'
import { MongoID } from '../../scalars/MongoID'
import { UserInputTypeInterface } from '../../types/User'

export interface UpdateUserArgs {
    _id: string
    user: UserInputTypeInterface
}

export const updateUser = () => ({
    type: UserType,
    description: 'Updates a user on database',
    args: {
        _id: {
            type: new GraphQLNonNull(MongoID),
            description: 'The ID of the user that you want to update',
            required: true,
        },
        user: {
            type: new GraphQLNonNull(UserInputType),
            description: 'The fields of a user that you want to update',
            required: true,
        },
    },
    resolve: (_, args: UpdateUserArgs) => {
        const userService = UserService()

        return userService.UpdateUser(args)
    },
})
