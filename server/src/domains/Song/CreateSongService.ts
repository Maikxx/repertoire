import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateSongArgs } from '../../api/Song/createSong.mutation'
import * as format from 'pg-format'
import { getDateFromISOString } from '../../services/DateFormatter'

export const CreateSong = async (args: CreateSongArgs) => {
    const {
        title,
        composer,
        creators,
        country,
        performanceRightsOrganization,
        publishers,
        createdAt,
        accepted,
    } = args.song
    const { name: artistName, share } = composer

    try {
        const { rows: [composerShare] } = await database.query(
            `INSERT INTO "artistShares" (
                name,
                share,
                role
            ) VALUES (
                $1, $2, $3
            ) RETURNING _id;`,
            [ artistName, share, 'composer' ]
        )

        if (!composerShare) {
            throw new ApolloError('Artist share insertion failed', '500')
        }

        let creatorShares: number[] | null = null
        if (creators && creators.length > 0) {
            const sql = `INSERT INTO "artistShares" (name, share, role) VALUES %L RETURNING _id;`
            const creatorInsertionData = format(sql, creators.map(creator => [ creator.name, creator.share, creator.role ]))

            const { rows: creatorShareRows } = await database.query(creatorInsertionData)
            creatorShares = creatorShareRows.map(creatorShare => creatorShare._id)
        }

        if (publishers && publishers.length > 0) {
            await Promise.all(publishers.map(async publisher => {
                await database.query(
                    `UPDATE publishers
                    SET role = $1
                    WHERE _id = $2;`,
                    [ publisher.role, publisher._id ]
                )
            }))
        }

        const hasCustomDate = !!createdAt
        const { rows: insertRows } = await database.query(
            `INSERT INTO songs (
                title,
                "composerShare",
                "creatorShares",
                country,
                "performanceRightsOrganization",
                publishers,
                accepted
                ${hasCustomDate ? ', "createdAt"' : ''}
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7${hasCustomDate ? ', $8' : ''}
            ) RETURNING *;`,
            hasCustomDate
                ? [
                    title,
                    composerShare._id,
                    creatorShares,
                    country,
                    performanceRightsOrganization,
                    publishers && publishers.map(publisher => publisher._id),
                    accepted,
                    getDateFromISOString(createdAt),
                ]
                : [
                    title,
                    composerShare._id,
                    creatorShares,
                    country,
                    performanceRightsOrganization,
                    publishers && publishers.map(publisher => publisher._id),
                    accepted,
                ]
        )

        const song = insertRows[0]
        return song
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
