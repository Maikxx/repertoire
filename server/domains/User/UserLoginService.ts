import { AuthArgs } from '../../api/User/userLogin.mutation'
import { ApolloError } from 'apollo-server-core'
import { encodeToken } from '../../services/TokenManager'
import { compare } from '../../services/Encrypter'
import { getCurrentISOStringDate } from '../../services/DateFormatter'
import { GetUsersByEmail } from '../helpers/GetUsersByEmail'

export const UserLogin = async (args: AuthArgs): Promise<{ token: string }> => {
    const email = args.auth.email
    const password = args.auth.password

    const users = await GetUsersByEmail(email)

    if (!users || !users.length) {
        throw new ApolloError('User not found', '404')
    }

    const user = users[0]
    const hashPassword = user.password

    if (compare(password, hashPassword)) {
        const token = encodeToken({
            id: user._id,
            email: user.email,
            createdAt: getCurrentISOStringDate(),
        })

        return { token }
    }

    throw new ApolloError('Email and/or password do not match', '409')
}
