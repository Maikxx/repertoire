import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'

export const GetMe = async (_id: string) => {
    try {
        const { rows, rowCount } = await database.query(
            'SELECT * FROM users WHERE _id = $1;',
            [_id]
        )

        if (!rowCount) {
            throw new Error('No user found with this identifier')
        }

        const me = rows[0]
        return me
    } catch (error) {
        throw new ApolloError('No user found with this identifier', '404')
    }
}
