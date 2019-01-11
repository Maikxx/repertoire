import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLFloat, GraphQLList } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'
import { CountryType } from '../Country/Country.type'
import { PublisherType } from '../Publisher/Publisher.type'

export const SongPublisherInputType = new GraphQLInputObjectType({
    name: 'SongPublisherInputType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        role: { type: GraphQLString },
    }),
})

export const SongType = new GraphQLObjectType({
    name: 'SongType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        composer: { type: new GraphQLNonNull(ArtistShareType) },
        creators: { type: new GraphQLList(ArtistShareType) },
        country: { type: CountryType },
        pro: { type: GraphQLString },
        publisher: { type: PublisherType },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: song => getISOStringFromDate(song.createdAt),
        },
    }),
})

export const SongInputType = new GraphQLInputObjectType({
    name: 'SongInputType',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        composer: { type: new GraphQLNonNull(ArtistShareInputType) },
        creators: { type: new GraphQLList(ArtistShareInputType) },
        pro: { type: GraphQLString },
        publisher: { type: SongPublisherInputType },
        createdAt: { type: GraphQLString },
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
            resolve: artistShare => getISOStringFromDate(artistShare.createdAt),
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
