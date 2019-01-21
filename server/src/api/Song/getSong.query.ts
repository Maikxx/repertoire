import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { SongType, SongFilterInputType } from './Song.type'
import { GetSongById } from '../../domains/Song/GetSongByIdService'
import { SongQueryArgs } from '../../types/Song'

export const getSong = () => ({
    type: SongType,
    args: {
        byId: {
            type: new GraphQLNonNull(GraphQLInt),
            required: true,
        },
        filters: { type: SongFilterInputType },
    },
    resolve: (_, args: SongQueryArgs) => GetSongById(args),
})
