import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetUsers = async () => {
    try {
        const { rows } = await database.query(
            'SELECT * FROM users;'
        )

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
