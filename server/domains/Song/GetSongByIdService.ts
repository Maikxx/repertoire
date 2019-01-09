import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'
import { DatabaseSongInterface } from '../../types/Song'

export const GetSongById = async (id: number) => {
    try {
        const { rows, rowCount } = await database.query(
            'SELECT * FROM songs WHERE _id = $1;',
            [id]
        )

        if (rowCount > 0) {
            const song = rows[0] as DatabaseSongInterface
            const { composerShareId } = song

            const { rows: [composerShare] } = await database.query(
                `SELECT * FROM "artistShare" WHERE _id = $1;`,
                [composerShareId]
            )

            if (!composerShare) {
                throw new ApolloError('No composer share found for the main author', '400')
            }

            delete song.composerShareId

            return {
                ...song,
                composer: composerShare,
            }
        }

        throw new ApolloError('No user found with this id', '404')
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
