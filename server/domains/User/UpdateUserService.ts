import { UpdateUserArgs } from '../../api/User/updateUser.mutation'
import { GetUserData } from '../helpers/GetUserData'
import { ApolloError } from 'apollo-server-core'
import { database } from '../../db/connect'

export const UpdateUser = async (args: UpdateUserArgs) => {
    const { _id } = args
    const updatedUserData = GetUserData(args)

    try {
        const { rows } = await database.query(
            `UPDATE users SET
                email = $1,
                name = $2,
                password = $3,
                "isAdmin" = $4,
                "isArtist" = $5,
                "isPublisher" = $6,
                "profileImage" = $7
            WHERE _id = $8 RETURNING *;`,
            [ ...Object.keys(updatedUserData).map(key => updatedUserData[key]), _id ]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
