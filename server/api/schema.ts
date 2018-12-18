import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { getCurrentUser } from './User/getCurrentUser.query'
import { userLogin } from './User/UserLogin.mutation'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getCurrentUser: getCurrentUser(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            loginUser: userLogin(),
        }),
    }),
})
