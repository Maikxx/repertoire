import { GraphQLObjectType, GraphQLString } from 'graphql'
import { MongoID } from '../../scalars/MongoID'
import { GraphQLDate } from 'graphql-iso-date'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: MongoID },
        createdAt: { type: GraphQLDate },
    }),
})

export const UserTokenType = new GraphQLObjectType({
    name: 'UserTokenType',
    fields: () => ({
        token: { type: GraphQLString },
        expiresAt: { type: GraphQLString },
    }),
})
