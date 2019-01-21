import { UserType } from './User.type'
import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { GetUserById } from '../../domains/User/GetUserByIdService'

interface GetUserArgs {
    _id: number
}

export const getUser = () => ({
    type: UserType,
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            required: true,
        },
    },
    resolve: (_, args: GetUserArgs) => GetUserById(args._id),
})
