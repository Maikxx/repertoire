import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'
import { AddPublisherToSongArgs } from '../../api/Song/addPublisherToSong.mutation'

export const AddPublisherToSong = async (args: AddPublisherToSongArgs) => {
    const { songId, publisher, performanceRightsOrganization } = args

    try {
        await database.query(
            `UPDATE publishers
            SET role = $1
            WHERE _id = $2;`,
            [ publisher.role, publisher._id ]
        )

        const { rows: [songRow] } = await database.query(
            `UPDATE songs
            SET publishers = array_append(publishers, $1),
                "performanceRightsOrganization" = $2
            WHERE _id = $3
            RETURNING _id;`,
            [ publisher._id, performanceRightsOrganization, songId ]
        )

        if (!songRow) {
            throw new ApolloError('Adding publisher to song failed', '500')
        }

        return { success: true }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
