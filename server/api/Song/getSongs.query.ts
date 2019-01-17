import { GetSongs } from '../../domains/Song/GetSongsService'
import { SongType, SongFilterInputType } from './Song.type'
import { GraphQLList } from 'graphql'
import { GetSongArgs } from '../../types/Song'

export const getSongs = () => ({
    type: new GraphQLList(SongType),
    args: {
        filters: { type: SongFilterInputType },
    },
    resolve: (_, args: GetSongArgs) => GetSongs(args),
})
