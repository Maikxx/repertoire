import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { GetSongData } from '../helpers/GetSongData'

export const GetSongs = async () => {
    try {
        const { rows: songRows, rowCount } = await database.query(
            'SELECT * FROM songs;'
        )

        if (!rowCount) {
            throw new ApolloError('There are no songs in the database', '404')
        }

        const songs = await Promise.all(songRows.map(GetSongData))

        return songs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
