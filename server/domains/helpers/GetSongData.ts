import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { DatabaseSongInterface } from '../../types/Song'

export const GetSongData = async (song: DatabaseSongInterface) => {
    try {

        const { creatorShares, composerShare, country, publisher, performanceRightsOrganization } = song

        const { rows: [composerShareRow] } = await database.query(
            `SELECT * FROM "artistShare" WHERE _id = $1;`,
            [composerShare]
        )

        const { rows: [countryRow] } = await database.query(
            `SELECT * FROM countries WHERE _id = $1;`,
            [country]
        )

        const { rows: [publisherRow] } = await database.query(
            `SELECT * FROM publishers WHERE _id = $1;`,
            [publisher]
        )

        const { rows: [performanceRightsOrganizationRow] } = await database.query(
            `SELECT * FROM "performanceRightsOrganizations" WHERE _id = $1;`,
            [performanceRightsOrganization]
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
        delete song.publisher
        delete song.performanceRightsOrganization

        return {
            ...song,
            country: countryRow,
            composer: composerShareRow,
            creators: creatorSharesData,
            publisher: publisherRow,
            performanceRightsOrganization: performanceRightsOrganizationRow,
        }
    } catch (error) {
        throw new Error(error)
    }
}
