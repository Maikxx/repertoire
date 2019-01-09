import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLFloat } from 'graphql'
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
            type: new GraphQLNonNull(ArtistShareType),
            description: 'The composer / writer of the song',
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
            type: new GraphQLNonNull(ArtistShareInputType),
        },
    }),
})

export const ArtistShareType = new GraphQLObjectType({
    name: 'ArtistShareType',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the artist share',
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the artist',
        },
        share: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'The share of the artist',
        },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Date of creation as ISO date',
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const ArtistShareInputType = new GraphQLInputObjectType({
    name: 'ArtistShareInputType',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the artist',
        },
        share: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'The share of the artist',
        },
    }),
})
