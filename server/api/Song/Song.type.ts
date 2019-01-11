import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLFloat, GraphQLList } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'
import { CountryType } from '../Country/Country.type'

export const SongType = new GraphQLObjectType({
    name: 'SongType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        composer: { type: new GraphQLNonNull(ArtistShareType) },
        creators: { type: new GraphQLList(ArtistShareType) },
        country: { type: CountryType },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const SongInputType = new GraphQLInputObjectType({
    name: 'SongInputType',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        composer: { type: new GraphQLNonNull(ArtistShareInputType) },
        creators: { type: new GraphQLList(ArtistShareInputType) },
        country: { type: GraphQLInt },
    }),
})

export const ArtistShareType = new GraphQLObjectType({
    name: 'ArtistShareType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        share: { type: new GraphQLNonNull(GraphQLFloat) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const ArtistShareInputType = new GraphQLInputObjectType({
    name: 'ArtistShareInputType',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        share: { type: new GraphQLNonNull(GraphQLFloat) },
        role: { type: GraphQLString },
    }),
})
