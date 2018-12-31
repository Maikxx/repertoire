import { CreateUserArgs } from '../../api/User/createUser.mutation'
import { GetUserData } from '../helpers/GetUserData'
import { database } from '../../db/connect'
import { encodeToken } from '../../services/TokenManager'
import { ApolloError } from 'apollo-server-core'

export const CreateUser = async (args: CreateUserArgs) => {
    const newUserData = GetUserData(args)

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO users (
                email,
                name,
                password,
                "isAdmin",
                "isArtist",
                "isPublisher",
                "profileImage"
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7
            ) RETURNING *;`,
            Object.keys(newUserData).map(key => newUserData[key])
        )

        const user = insertRows[0]
        const token = encodeToken({
            id: user._id,
            email: user.email,
            createdAt: user.createdAt,
        })

        return { token }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
