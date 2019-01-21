import { GraphQLList } from 'graphql'
import { PublisherType } from './Publisher.type'
import { GetPublishers } from '../../domains/Publisher/GetPublishersService'

export const getPublishers = () => ({
    type: new GraphQLList(PublisherType),
    resolve: () => GetPublishers(),
})
