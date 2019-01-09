import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateSongArgs } from '../../api/Song/createSong.mutation'

export const CreateSong = async (args: CreateSongArgs) => {
    const { title, composer, composerShare } = args.song

    const songData = {
        title,
        composer,
        composerShare,
    }

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO songs (
                title,
                composer,
                "composerShare"
            ) VALUES (
                $1, $2, $3
            ) RETURNING *;`,
            Object.keys(songData).map(key => songData[key])
        )

        const song = insertRows[0]
        return song
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
