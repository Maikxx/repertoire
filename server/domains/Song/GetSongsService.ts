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

        const songs = await Promise.all(songRows.map(async (song: DatabaseSongInterface) => {
            const { creatorShares, composerShare, country } = song

            const { rows: [composerShareRow] } = await database.query(
                `SELECT * FROM "artistShare" WHERE _id = $1;`,
                [composerShare]
            )

            const { rows: [countryRow] } = await database.query(
                `SELECT * FROM countries WHERE _id = $1;`,
                [country]
            )

            const creatorSharesData = await Promise.all(creatorShares.map(async creatorShare => {
                const { rows: [composerShareRow] } = await database.query(
                    `SELECT * FROM "artistShare" WHERE _id = $1;`,
                    [creatorShare]
                )

                return composerShareRow
            }))

            if (!composerShareRow) {
                throw new ApolloError('No composer share found for the main author', '400')
            }

            delete song.composerShare
            delete song.country

            return {
                ...song,
                country: countryRow,
                composer: composerShareRow,
                creators: creatorSharesData,
            }
        }))

        return songs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
