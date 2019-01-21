import { UserType } from './User.type'
import { GetUsers } from '../../domains/User/GetUsersService'
import { GraphQLList } from 'graphql'

export const getUsers = () => ({
    type: new GraphQLList(UserType),
    resolve: () => GetUsers(),
})
