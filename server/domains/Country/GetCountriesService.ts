import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetCountries = async () => {
    try {
        const { rows } = await database.query('SELECT * FROM countries;')

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
