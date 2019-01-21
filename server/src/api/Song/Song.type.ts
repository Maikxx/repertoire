import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean
} from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'
import { CountryType } from '../Country/Country.type'
import { PublisherType } from '../Publisher/Publisher.type'
import { PerformanceRightsOrganizationType } from '../PerformanceRightsOrganization/PerformanceRightsOrganization.type'

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
        performanceRightsOrganization: { type: PerformanceRightsOrganizationType },
        publishers: { type: new GraphQLList(PublisherType) },
        accepted: { type: new GraphQLNonNull(GraphQLBoolean) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: song => getISOStringFromDate(song.createdAt),
        },
    }),
})

export const SongFilterInputType = new GraphQLInputObjectType({
    name: 'SongFilterInputType',
    fields: () => ({
        filterByIsAccepted: { type: new GraphQLNonNull(GraphQLBoolean) },
    }),
})

export const SongInputType = new GraphQLInputObjectType({
    name: 'SongInputType',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        composer: { type: new GraphQLNonNull(ArtistShareInputType) },
        creators: { type: new GraphQLList(ArtistShareInputType) },
        performanceRightsOrganization: { type: GraphQLInt },
        publishers: { type: new GraphQLList(SongPublisherInputType) },
        accepted: { type: new GraphQLNonNull(GraphQLBoolean) },
        country: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
    }),
})

export const ArtistShareType = new GraphQLObjectType({
    name: 'ArtistShareType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        share: { type: new GraphQLNonNull(GraphQLFloat) },
        role: { type: GraphQLString },
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
