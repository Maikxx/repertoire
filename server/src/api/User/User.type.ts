import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLInt) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
        profileImage: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        createdAt: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: user => getISOStringFromDate(user.createdAt),
        },
    }),
})

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    fields: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        profileImage: { type: GraphQLString },
    },
})

export const UserTokenType = new GraphQLObjectType({
    name: 'UserTokenType',
    fields: () => ({
        token: { type: GraphQLString },
        expiresAt: { type: GraphQLString },
    }),
})

export const AuthType = new GraphQLObjectType({
    name: 'AuthType',
    fields: {
        token: { type: GraphQLString },
    },
})

export const AuthInputType = new GraphQLInputObjectType({
    name: 'AuthInputType',
    fields: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
})
