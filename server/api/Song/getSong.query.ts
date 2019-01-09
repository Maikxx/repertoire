import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { SongType } from './Song.type'
import { GetSongById } from '../../domains/Song/GetSongByIdService'

interface GetSongArgs {
    _id: number
}

export const getSong = () => ({
    type: SongType,
    args: {
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'ID of the song that you want to get',
            required: true,
        },
    },
    resolve: (_, args: GetSongArgs) => GetSongById(args._id),
})
