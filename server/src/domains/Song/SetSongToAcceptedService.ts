import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'
import { SetSongToAcceptedArgs } from '../../api/Song/setSongToAccepted.mutation'

export const SetSongToAccepted = async (args: SetSongToAcceptedArgs) => {
    const { songId } = args

    try {
        await database.query(
            `UPDATE songs
            SET accepted = true
            WHERE _id = $1;`,
            [songId]
        )

        return { success: true }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
