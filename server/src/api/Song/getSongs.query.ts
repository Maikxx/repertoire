import { GetSongs } from '../../domains/Song/GetSongsService'
import { SongType, SongFilterInputType } from './Song.type'
import { GraphQLList } from 'graphql'
import { SongQueryArgs } from '../../types/Song'

export const getSongs = () => ({
    type: new GraphQLList(SongType),
    args: {
        filters: { type: SongFilterInputType },
    },
    resolve: (_, args: SongQueryArgs) => GetSongs(args),
})
