import { GraphQLNonNull } from 'graphql'
import { SongInputTypeInterface } from '../../types/Song'
import { CreateSong } from '../../domains/Song/CreateSongService'
import { SongType, SongInputType } from './Song.type'

export interface CreateSongArgs {
    song: SongInputTypeInterface
}

export const createSong = () => ({
    type: SongType,
    description: 'Create a country on database',
    args: {
        song: {
            type: new GraphQLNonNull(SongInputType),
            description: 'The input type required to create a song',
            required: true,
        },
    },
    resolve: (_, args: CreateSongArgs) => {
        return CreateSong(args)
    },
})
