import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreatePublisherArgs } from '../../api/Publisher/createPublisher.mutation'

export const CreatePublisher = async (args: CreatePublisherArgs) => {
    const { name } = args.publisher

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO publishers (
                name
            ) VALUES (
                $1
            ) RETURNING *;`,
            [name]
        )

        const publisher = insertRows[0]
        return { publisher }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
