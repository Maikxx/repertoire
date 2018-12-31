import * as jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'

require('dotenv').load()

const secretKey = process.env.SECRET_KEY

interface TokenPayload {
    id: number
    email?: string
    createdAt?: string
}

export const encodeToken = (payload?: TokenPayload): string => {
    if (typeof payload === 'undefined' || payload === null) {
        throw new ApolloError('Payload cannot be empty', '409')
    }

    const token = jwt.sign(payload, secretKey)

    return token
}

export const decodeToken = async (token?: string) => {
    const decoded = await jwt.verify(token, secretKey)

    return decoded
}
