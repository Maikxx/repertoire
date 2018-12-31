import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetUsersByEmail = async (email: string): Promise<any[]> => {
    try {
        const { rows } = await database.query(
            'SELECT * FROM users WHERE email = $1;',
            [email]
        )

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
