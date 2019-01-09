import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { DatabaseSongInterface } from '../../types/Song'

export const GetSongs = async () => {
    try {
        const { rows: songRows, rowCount } = await database.query(
            'SELECT * FROM songs;'
        )

        if (!rowCount) {
            throw new ApolloError('There are no songs in the database', '404')
        }

        const songs = await Promise.all(songRows.map(async (songRow: DatabaseSongInterface) => {
            const { rows: [composerShare] } = await database.query(
                `SELECT * FROM "artistShare" WHERE _id = $1;`,
                [songRow.composerShareId]
            )

            if (!composerShare) {
                throw new ApolloError('No composer share found for the main author', '400')
            }

            delete songRow.composerShareId

            return {
                ...songRow,
                composer: composerShare,
            }
        }))

        return songs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
