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
import { getSong } from './Song/getSong.query'
import { getSongs } from './Song/getSongs.query'
import { getPublishers } from './Publisher/getPublishers.query'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'The root for all queries available.',
        fields: () => ({
            getCountries: getCountries(),
            getSong: getSong(),
            getSongs: getSongs(),
            getUser: getUser(),
            getUsers: getUsers(),
            me: getMe(),
            getPublishers: getPublishers(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: 'The root for all mutations available.',
        fields: () => ({
            createCountry: createCountry(),
            createSong: createSong(),
            createUser: createUser(),
            deleteUser: deleteUser(),
            updateUser: updateUser(),
            userLogin: userLogin(),
        }),
    }),
})
