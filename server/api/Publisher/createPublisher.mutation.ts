import { GraphQLNonNull } from 'graphql'
import { PublisherType, PublisherInputType } from './Publisher.type'
import { PublisherInputTypeInterface } from '../../types/Publisher'
import { CreatePublisher } from '../../domains/Publisher/CreatePublisherService'

export interface CreatePublisherArgs {
    publisher: PublisherInputTypeInterface
}

export const createPublisher = () => ({
    type: PublisherType,
    args: {
        country: {
            type: new GraphQLNonNull(PublisherInputType),
            required: true,
        },
    },
    resolve: (_, args: CreatePublisherArgs) => CreatePublisher(args),
})
