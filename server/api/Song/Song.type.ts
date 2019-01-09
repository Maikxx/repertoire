import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const SongType = new GraphQLObjectType({
    name: 'SongType',
    description: 'A song',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the song',
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the song',
        },
        composer: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The composer/writer of the song',
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Date of creation as ISO date',
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const SongInputType = new GraphQLInputObjectType({
    name: 'SongInputType',
    description: 'The input type of a new song',
    fields: () => ({
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        composer: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
})
