import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { UserType } from './User.type'
import { DeleteUser } from '../../domains/User/DeleteUserService'

export interface DeleteUserArgs {
    _id: number
}

export const deleteUser = () => ({
    type: UserType,
    description: 'Deletes a user on database',
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The ID of the user that you want to delete',
            required: true,
        },
    },
    resolve: (_, args: DeleteUserArgs) => DeleteUser(args),
})
