import { AddCreatorToSongArgs } from '../../api/Song/addCreatorToSong.mutation'
import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'

export const AddCreatorToSong = async (args: AddCreatorToSongArgs) => {
    const { songId, creator } = args
    const { share, role, name } = creator

    try {
        const { rows: [creatorShareRow] } = await database.query(
            `INSERT INTO "artistShares" (
                name,
                share,
                role
            ) VALUES (
                $1, $2, $3
            ) RETURNING _id;`,
            [ name, share, role ]
        )

        if (!creatorShareRow) {
            throw new ApolloError('Artist share insertion failed', '500')
        }

        const { rows: [songRow] } = await database.query(
            `UPDATE songs
            SET "creatorShares" = array_append("creatorShares", $1)
            WHERE _id = $2
            RETURNING _id;`,
            [ creatorShareRow._id, songId ]
        )

        if (!songRow) {
            throw new ApolloError('Adding creator to song failed', '500')
        }

        return { success: true }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
