import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql'
import { getISOStringFromDate } from '../../services/DateFormatter'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    description: 'A user',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the user',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The email address of the user',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user',
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The encrypted password of the user',
        },
        profileImage: {
            type: GraphQLString,
            description: 'A base64 profile image of the user',
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'Whether or not the user is admin',
        },
        createdAt: {
            type: GraphQLString,
            description: 'Date of creation as ISO date',
            resolve: user => getISOStringFromDate(user.createdAt),
        },
    }),
})

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    description: 'Defines all the arguments that are needed to create or update a user',
    fields: {
        email: {
            type: GraphQLString,
            description: 'The email address of the user',
        },
        password: {
            type: GraphQLString,
            description: 'The encrypted password of the user',
        },
        isAdmin: {
            type: GraphQLBoolean,
            description: 'A switch whether or not the user is an admin',
        },
        name: {
            type: GraphQLString,
            description: 'The name of the user',
        },
        profileImage: {
            type: GraphQLString,
            description: 'A base64 profile image of the user',
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
