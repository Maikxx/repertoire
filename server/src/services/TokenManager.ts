import * as jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-express'
require('dotenv').config()

const { SECRET_KEY } = process.env

interface TokenPayload {
    id: number
    email?: string
    createdAt?: string
}

export const encodeToken = (payload?: TokenPayload): string => {
    if (typeof payload === 'undefined' || payload === null) {
        throw new ApolloError('Payload cannot be empty', '409')
    }

    const token = jwt.sign(payload, SECRET_KEY)

    return token
}

export const decodeToken = async (token?: string) => {
    const decoded = await jwt.verify(token, SECRET_KEY)

    return decoded
}
