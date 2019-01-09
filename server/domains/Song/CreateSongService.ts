import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateSongArgs } from '../../api/Song/createSong.mutation'

export const CreateSong = async (args: CreateSongArgs) => {
    const { title, composer } = args.song
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

        const { rows: insertRows } = await database.query(
            `INSERT INTO songs (
                title,
                "composerShareId"
            ) VALUES (
                $1, $2
            ) RETURNING *;`,
            [ title, composerShare._id ]
        )

        const song = insertRows[0]
        return song
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
