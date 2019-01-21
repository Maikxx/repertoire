import { GraphQLNonNull } from 'graphql'
import { SongInputTypeInterface } from '../../types/Song'
import { CreateSong } from '../../domains/Song/CreateSongService'
import { SongType, SongInputType } from './Song.type'

export interface CreateSongArgs {
    song: SongInputTypeInterface
}

export const createSong = () => ({
    type: SongType,
    args: {
        song: {
            type: new GraphQLNonNull(SongInputType),
            required: true,
        },
    },
    resolve: (_, args: CreateSongArgs) => CreateSong(args),
})
