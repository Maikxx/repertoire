import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { GetSongData } from '../helpers/GetSongData'
import { GetSongArgs } from '../../types/Song'

export const GetSongs = async (args?: GetSongArgs) => {
    const filterByIsAccepted = args && args.filters && args.filters.filterByIsAccepted

    try {
        let queryString = ``
        const queryVariables = []
        if (typeof filterByIsAccepted === 'boolean') {
            queryString = `SELECT * FROM songs WHERE accepted = $1;`
            queryVariables.push(filterByIsAccepted)
        } else {
            queryString = `SELECT * FROM songs;`
        }

        const { rows: songRows, rowCount } = await database.query(
            queryString,
            queryVariables
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
