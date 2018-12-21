import { UserService } from '../../domains/User/UserService'
import { UserType } from './User.type'
import { GraphQLNonNull } from 'graphql'
import { MongoID } from '../../scalars/MongoID'

interface GetUserArgs {
    _id: string
}

export const getUser = () => ({
    type: UserType,
    args: {
        _id: {
            type: new GraphQLNonNull(MongoID),
            description: 'ID of the user that you wanna get',
            required: true,
        },
    },
    resolve: async (_, args: GetUserArgs) => {
        const userService = UserService()

        const user = await userService.GetUserById(args._id)
        return user
    },
})
