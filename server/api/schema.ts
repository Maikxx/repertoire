import { GraphQLSchema, GraphQLObjectType } from 'graphql'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({

        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({

        }),
    }),
})
