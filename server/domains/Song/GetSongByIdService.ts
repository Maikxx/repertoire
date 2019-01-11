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
            const { composerShare, creatorShares, country } = song

            const { rows: [composerShareRow] } = await database.query(
                `SELECT * FROM "artistShare" WHERE _id = $1;`,
                [composerShare]
            )

            const { rows: [countryRow] } = await database.query(
                `SELECT * FROM countries WHERE _id = $1;`,
                [country]
            )

            if (!composerShare) {
                throw new ApolloError('No composer share found for the main author', '400')
            }

            const creatorSharesData = await Promise.all(creatorShares.map(async creatorShare => {
                const { rows: [composerShareRow] } = await database.query(
                    `SELECT * FROM "artistShare" WHERE _id = $1;`,
                    [creatorShare]
                )

                return composerShareRow
            }))

            const { rows: [publisherRow] } = await database.query(
                `SELECT * FROM publishers WHERE _id = $1;`,
                [song.publisher]
            )

            delete song.composerShare
            delete song.creatorShares
            delete song.publisher

            return {
                ...song,
                composer: composerShareRow,
                creators: creatorSharesData,
                country: countryRow,
                publisher: publisherRow,
            }
        }

        throw new ApolloError('No user found with this id', '404')
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
