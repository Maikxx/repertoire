import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetPublishers = async () => {
    try {
        const { rows } = await database.query('SELECT * FROM publishers ORDER BY name;')

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
