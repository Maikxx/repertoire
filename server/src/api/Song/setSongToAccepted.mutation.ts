import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { GenericMutationResponseType } from '../generic'
import { SetSongToAccepted } from '../../domains/Song/SetSongToAcceptedService'

export interface SetSongToAcceptedArgs {
    songId: number
}

export const setSongToAccepted = () => ({
    type: GenericMutationResponseType,
    args: {
        songId: { type: new GraphQLNonNull(GraphQLInt), required: true },
    },
    resolve: (_, args: SetSongToAcceptedArgs) => SetSongToAccepted(args),
})
