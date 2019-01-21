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
import { getPerformanceRightsOrganizations } from './PerformanceRightsOrganization/getPerformanceRightsOrganization.query'
import { createPerformanceRightsOrganization } from './PerformanceRightsOrganization/createPerformanceRightsOrganization.mutation'
import { addCreatorToSong } from './Song/addCreatorToSong.mutation'
import { addPublisherToSong } from './Song/addPublisherToSong.mutation'
import { setSongToAccepted } from './Song/setSongToAccepted.mutation'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: 'The root for all queries available.',
        fields: () => ({
            getCountries: getCountries(),
            getPerformanceRightsOrganizations: getPerformanceRightsOrganizations(),
            getPublishers: getPublishers(),
            getSong: getSong(),
            getSongs: getSongs(),
            getUser: getUser(),
            getUsers: getUsers(),
            me: getMe(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: 'The root for all mutations available.',
        fields: () => ({
            addCreatorToSong: addCreatorToSong(),
            addPublisherToSong: addPublisherToSong(),
            createCountry: createCountry(),
            createPerformanceRightsOrganization: createPerformanceRightsOrganization(),
            createSong: createSong(),
            createUser: createUser(),
            deleteUser: deleteUser(),
            setSongToAccepted: setSongToAccepted(),
            updateUser: updateUser(),
            userLogin: userLogin(),
        }),
    }),
})
