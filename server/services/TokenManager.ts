import * as jwt from 'jsonwebtoken'

const secretKey = process.env.SECRET_KEY

interface TokenPayload {
    id: string
    email?: string
    createdAt?: string
}

export const encodeToken = (payload?: TokenPayload): string => {
    if (typeof payload === 'undefined' || payload === null) {
        return null
    }

    const token = jwt.sign(payload, secretKey)

    return token
}

export const decodeToken = async (token?: string) => {
    const decoded = await jwt.verify(token, secretKey)

    return decoded
}
