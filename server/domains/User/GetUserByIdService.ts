import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'

export const GetUserById = async (id: number) => {
    try {
        const { rows, rowCount } = await database.query(
            'SELECT * FROM users WHERE _id = $1;',
            [id]
        )

        if (rowCount > 0) {
            return rows[0]
        }

        throw new ApolloError('No user found with this id', '404')
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
