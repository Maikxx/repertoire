import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { getCurrentUser } from './User/getCurrentUser.query'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            currentUser: getCurrentUser(),
        }),
    }),
    // mutation: new GraphQLObjectType({
    //     name: 'Mutation',
    //     fields: () => ({

    //     }),
    // }),
})
