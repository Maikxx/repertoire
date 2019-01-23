import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'

export const GetCountries = async () => {
    try {
        const sql = `SELECT * FROM countries ORDER BY name;`
        const { rows } = await database.query(sql)

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
