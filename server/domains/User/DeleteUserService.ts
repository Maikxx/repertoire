import { DeleteUserArgs } from '../../api/User/deleteUser.mutation'
import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const DeleteUser = async (args: DeleteUserArgs) => {
    const { _id } = args

    try {
        const { rowCount } = await database.query(
            'DELETE FROM users WHERE _id = $1',
            [_id]
        )

        if (rowCount > 0) {
            return { success: true }
        }

        return { success: false }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
