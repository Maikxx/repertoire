import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const CountryType = new GraphQLObjectType({
    name: 'CountryType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const CountryInputType = new GraphQLInputObjectType({
    name: 'CountryInputType',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
    }),
})
