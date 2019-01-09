import { GetSongs } from '../../domains/Song/GetSongsService'
import { SongType } from './Song.type'
import { GraphQLList } from 'graphql'

export const getSongs = () => ({
    type: new GraphQLList(SongType),
    resolve: () => GetSongs(),
})
