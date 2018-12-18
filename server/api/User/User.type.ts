import { GraphQLObjectType } from 'graphql'
import { MongoID } from '../../scalars/MongoID'
import { GraphQLDate } from 'graphql-iso-date'

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        _id: { type: MongoID },
        createdAt: { type: GraphQLDate },
    }),
})
