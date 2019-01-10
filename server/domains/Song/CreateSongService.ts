import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateSongArgs } from '../../api/Song/createSong.mutation'

export const CreateSong = async (args: CreateSongArgs) => {
    const { title, composer, creators } = args.song
    const { name: artistName, share } = composer

    try {
        const { rows: [composerShare] } = await database.query(
            `INSERT INTO "artistShare" (
                name,
                share
            ) VALUES (
                $1, $2
            ) RETURNING _id;`,
            [ artistName, share ]
        )

        if (!composerShare) {
            throw new ApolloError('Artist share insertion failed', '500')
        }

        let creatorShareIds: number[] | null = null
        if (creators && creators.length > 0) {
            const ids = await Promise.all(creators.map(async creator => {
                const { rows: [creatorShare] } = await database.query(
                    `INSERT INTO "artistShare" (
                        name,
                        share
                    ) VALUES (
                        $1, $2
                    ) RETURNING _id;`,
                    [ creator.name, creator.share ]
                )

                return creatorShare._id
            }))

            creatorShareIds = ids
        }

        const { rows: insertRows } = await database.query(
            `INSERT INTO songs (
                title,
                "composerShareId",
                "creatorShareIds"
            ) VALUES (
                $1, $2, $3
            ) RETURNING *;`,
            [ title, composerShare._id, creatorShareIds ]
        )

        const song = insertRows[0]
        return song
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
