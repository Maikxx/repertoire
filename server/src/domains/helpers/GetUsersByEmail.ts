import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetUsersByEmail = async (email: string): Promise<any[]> => {
    try {
        const sql = `SELECT * FROM users WHERE email = $1;`
        const { rows } = await database.query(
            sql,
            [email]
        )

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
