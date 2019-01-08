import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'

export const CountryType = new GraphQLObjectType({
    name: 'CountryType',
    description: 'An individual country',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the country',
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the country',
        },
        code: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The country code of the country',
        },
    }),
})

export const CountryInputType = new GraphQLInputObjectType({
    name: 'CountryInputType',
    description: 'The input type for creating a country on the database',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the country',
        },
        code: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The country code of the country',
        },
    }),
})
