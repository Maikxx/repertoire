import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { createUser } from './User/CreateUser.mutation'
import { deleteUser } from './User/deleteUser.mutation'
import { getUser } from './User/getUser.query'
import { getUsers } from './User/getUsers.query'
import { updateUser } from './User/updateUser.mutation'
import { userLogin } from './User/userLogin.mutation'
import { getMe } from './User/getMe.query'
import { createCountry } from './Country/createCountry.mutation'
import { getCountries } from './Country/getCountries.query'
import { createSong } from './Song/createSong.mutation'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'The root for all queries available.',
        fields: () => ({
            getCountries: getCountries(),
            getUser: getUser(),
            getUsers: getUsers(),
            me: getMe(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: 'The root for all mutations available.',
        fields: () => ({
            createCountry: createCountry(),
            createUser: createUser(),
            deleteUser: deleteUser(),
            updateUser: updateUser(),
            userLogin: userLogin(),
            createSong: createSong(),
        }),
    }),
})
