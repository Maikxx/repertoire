import { Client } from 'pg'
import { createSongsTable } from './setup/createSongsTable'
import { createCountriesTable } from './setup/createCountriesTable'
import { createUsersTable } from './setup/createUsersTable'
import { createArtistShareTable } from './setup/createArtistShareTable'
import { createPublishersTable } from './setup/createPublishersTable'
import { createPerformanceRightsOrganizationsTable } from './setup/createPerformanceRightsOrganizationsTable'
import { clearDatabase } from './clearDatabase'
require('dotenv').load()

export const database = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
})

export const connectToDatabase = async (): Promise<void> => {
    await database.connect()

    if (process.env.RUN_CLEANERS === 'true') {
        await clearDatabase()
    }

    await database.query(`
        ${createCountriesTable}
        ${createPerformanceRightsOrganizationsTable}
        ${createUsersTable}
        ${createPublishersTable}
        ${createArtistShareTable}
        ${createSongsTable}
    `)
}
