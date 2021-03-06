import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { GetSongData } from '../helpers/GetSongData'
import { SongQueryArgs } from '../../types/Song'

export const GetSongs = async (args?: SongQueryArgs) => {
    const filterByIsAccepted = args && args.filters && args.filters.filterByIsAccepted

    try {
        let sql = ``
        const queryVariables = []
        if (typeof filterByIsAccepted === 'boolean') {
            sql = `
                SELECT * FROM songs
                WHERE accepted = $1
                ORDER BY "createdAt" DESC;`
            queryVariables.push(filterByIsAccepted)
        } else {
            sql = `
                SELECT * FROM songs
                ORDER BY "createdAt" DESC;`
        }

        const { rows: songRows } = await database.query(
            sql,
            queryVariables
        )

        const songs = songRows.length > 0
            ? await Promise.all(songRows.map(GetSongData))
            : []

        return songs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
