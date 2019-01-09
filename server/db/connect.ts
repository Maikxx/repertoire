import { Client } from 'pg'
import { createSongsTable } from './setup/createSongsTable'
import { createCountriesTable } from './setup/createCountriesTable'
import { createUsersTable } from './setup/createUsersTable'
import { createArtistShareTable } from './setup/createArtistShareTable'
require('dotenv').load()

export const database = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
})

export const connectToDatabase = async (): Promise<void> => {
    await database.connect()
    await database.query(`
        ${createUsersTable}
        ${createArtistShareTable}
        ${createSongsTable}
        ${createCountriesTable}
    `)
}
