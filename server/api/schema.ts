import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { createUser } from './User/CreateUser.mutation'
import { deleteUser } from './User/deleteUser.mutation'
import { getUser } from './User/getUser.query'
import { getUsers } from './User/getUsers.query'
import { updateUser } from './User/updateUser.mutation'
import { userLogin } from './User/userLogin.mutation'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'The root for all queries available.',
        fields: () => ({
            getUser: getUser(),
            getUsers: getUsers(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: 'The root for all mutations available.',
        fields: () => ({
            createUser: createUser(),
            updateUser: updateUser(),
            deleteUser: deleteUser(),
            userLogin: userLogin(),
        }),
    }),
})
