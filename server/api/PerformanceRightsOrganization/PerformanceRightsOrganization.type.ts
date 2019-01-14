import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const PerformanceRightsOrganizationType = new GraphQLObjectType({
    name: 'PerformanceRightsOrganizationType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: country => getISOStringFromDate(country.createdAt),
        },
    }),
})

export const PerformanceRightsOrganizationInputType = new GraphQLInputObjectType({
    name: 'PerformanceRightsOrganizationInputType',
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
})
