import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateCountryArgs } from '../../api/Country/createCountry.mutation'

export const CreateCountry = async (args: CreateCountryArgs) => {
    const { name, code } = args.country

    const countryData = {
        name,
        code,
    }

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO countries (
                name,
                code
            ) VALUES (
                $1, $2
            ) RETURNING *;`,
            Object.keys(countryData).map(key => countryData[key])
        )

        const country = insertRows[0]
        return { country }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
