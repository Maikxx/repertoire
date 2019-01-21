import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { GenericMutationResponseType } from '../generic'
import { AddPublisherToSong } from '../../domains/Song/AddPublisherToSongService'
import { PublisherInputTypeInterface } from '../../types/Publisher'
import { SongPublisherInputType } from './Song.type'

export interface AddPublisherToSongArgs {
    songId: number
    publisher: PublisherInputTypeInterface
    performanceRightsOrganization?: number
}

export const addPublisherToSong = () => ({
    type: GenericMutationResponseType,
    args: {
        songId: { type: new GraphQLNonNull(GraphQLInt), required: true },
        publisher: { type: new GraphQLNonNull(SongPublisherInputType), required: true },
        performanceRightsOrganization: { type: GraphQLInt },
    },
    resolve: (_, args: AddPublisherToSongArgs) => AddPublisherToSong(args),
})
