import * as bcrypt from 'bcrypt'

const saltRounds = 10

export const encrypt = (text?: string): string | null => {
    if (typeof text === 'undefined' || text === null) {
        return null
    }

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(text, salt)

    return hash
}

export const compare = (text?: string, hash?: string): boolean => {
    return bcrypt.compareSync(text, hash)
}
