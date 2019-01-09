import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreateSongArgs } from '../../api/Song/createSong.mutation'

export const CreateSong = async (args: CreateSongArgs) => {
    const { title, composer } = args.song

    const songData = {
        title,
        composer,
    }

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO songs (
                title,
                composer
            ) VALUES (
                $1, $2
            ) RETURNING *;`,
            Object.keys(songData).map(key => songData[key])
        )

        const song = insertRows[0]
        return song
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
