import { GraphQLNonNull } from 'graphql'
import { MongoID } from '../../scalars/MongoID'
import { UserType } from './User.type'
import { UserService } from '../../domains/User/UserService'

export interface DeleteUserArgs {
    _id: string
}

export const deleteUser = () => ({
    type: UserType,
    description: 'Deletes a user on database',
    args: {
        _id: {
            type: new GraphQLNonNull(MongoID),
            description: 'The ID of the user that you want to delete',
            required: true,
        },
    },
    resolve: (_, args: DeleteUserArgs) => {
        const userService = UserService()
        return userService.DeleteUser(args)
    },
})
