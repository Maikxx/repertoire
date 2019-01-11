import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const PublisherType = new GraphQLObjectType({
    name: 'PublisherType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const PublisherInputType = new GraphQLInputObjectType({
    name: 'PublisherInputType',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
})
