import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'
import { DatabaseSongInterface } from '../../types/Song'
import { GetSongData } from '../helpers/GetSongData'

export const GetSongById = async (id: number) => {
    try {
        const { rows, rowCount } = await database.query(
            'SELECT * FROM songs WHERE _id = $1;',
            [id]
        )

        if (rowCount > 0) {
            const song = rows[0] as DatabaseSongInterface
            return GetSongData(song)
        }

        throw new ApolloError('No user found with this id', '404')
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
