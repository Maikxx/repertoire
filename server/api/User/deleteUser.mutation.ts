import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { UserType } from './User.type'
import { DeleteUser } from '../../domains/User/DeleteUserService'

export interface DeleteUserArgs {
    _id: number
}

export const deleteUser = () => ({
    type: UserType,
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            required: true,
        },
    },
    resolve: (_, args: DeleteUserArgs) => DeleteUser(args),
})
