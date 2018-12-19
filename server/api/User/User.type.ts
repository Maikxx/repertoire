import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInputObjectType } from 'graphql'
import { MongoID } from '../../scalars/MongoID'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'A user',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(MongoID),
            description: 'The id of the user',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User email',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Encrypted password',
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'Whether or not the user is admin',
        },
        createdAt: {
            type: GraphQLString,
            description: 'Created date in ISO format',
            resolve: user => getISOStringFromDate(user.createdAt),
        },
        updatedAt: {
            type: GraphQLString,
            description: 'Updated date in ISO format',
            resolve: user => getISOStringFromDate(user.updatedAt),
        },
    }),
})

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    description: 'Defines all the arguments that are needed to create or update a user',
    fields: {
        email: {
            type: GraphQLString,
            description: 'User email',
        },
        password: {
            type: GraphQLString,
            description: 'Encrypted password',
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'A switch whether or not the user is an admin',
        },
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
    description: 'An authentication type',
    fields: {
        token: {
            type: GraphQLString,
            description: 'The desired token',
        },
    },
})

export const AuthInputType = new GraphQLInputObjectType({
    name: 'AuthInputType',
    description: 'Defines all the arguments that are needed to authenticate a user',
    fields: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User email',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'User password',
        },
    },
})
