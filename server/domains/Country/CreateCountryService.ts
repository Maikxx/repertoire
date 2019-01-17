import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateCountryArgs } from '../../api/Country/createCountry.mutation'

export const CreateCountry = async (args: CreateCountryArgs) => {
    const { name, code } = args.country

    try {
        const sql = `
            INSERT INTO countries (
                name,
                code
            ) VALUES (
                $1, $2
            ) RETURNING *;
        `
        const queryVariables = [ name, code ]
        const { rows: [country] } = await database.query(sql, queryVariables)

        return { country }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
