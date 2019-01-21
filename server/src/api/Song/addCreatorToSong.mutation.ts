import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { ArtistShareInputInterface } from '../../types/Song'
import { ArtistShareInputType } from './Song.type'
import { GenericMutationResponseType } from '../generic'
import { AddCreatorToSong } from '../../domains/Song/AddCreatorToSongService'

export interface AddCreatorToSongArgs {
    songId: number
    creator: ArtistShareInputInterface
}

export const addCreatorToSong = () => ({
    type: GenericMutationResponseType,
    args: {
        songId: { type: new GraphQLNonNull(GraphQLInt), required: true },
        creator: { type: new GraphQLNonNull(ArtistShareInputType), required: true },
    },
    resolve: (_, args: AddCreatorToSongArgs) => AddCreatorToSong(args),
})
