import { CreateUser } from '../../domains/User/CreateUserService'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export const seedArtists = async (): Promise<void> => {
    const data = await readFile(path.resolve(__dirname, '../data/artists.json'), 'utf8')
    const artists = JSON.parse(data)

    await Promise.all(artists.map(artist => CreateUser({ user: artist })))
}
