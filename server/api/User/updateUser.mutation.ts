import { GraphQLNonNull } from 'graphql'
import { UserType, UserInputType } from './User.type'
import { UserService } from '../../domains/User/UserService'
import { MongoID } from '../../scalars/MongoID'

export const updateUser = () => ({
    type: UserType,
    description: 'Updates a user on database',
    args: {
        _id: {
            type: new GraphQLNonNull(MongoID),
            description: 'The ID of the user that you wanna update',
        },
        user: {
            type: new GraphQLNonNull(UserInputType),
            description: 'User data that you wanna update',
        },
    },
    resolve: (_, args) => {
        const userService = UserService()
        return userService.UpdateUser(args)
    },
})
