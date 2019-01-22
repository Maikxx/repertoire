import { Client } from 'pg'
import { createSongsTable } from './setup/createSongsTable'
import { createCountriesTable } from './setup/createCountriesTable'
import { createUsersTable } from './setup/createUsersTable'
import { createArtistShareTable } from './setup/createArtistShareTable'
import { createPublishersTable } from './setup/createPublishersTable'
import { createPerformanceRightsOrganizationsTable } from './setup/createPerformanceRightsOrganizationsTable'
import { clearDatabase } from './clearDatabase'
require('dotenv').config()

const { PG_HOST, PG_DATABASE, PG_PORT, PG_PASSWORD, RUN_CLEANERS, DATABASE_URL, NODE_ENV } = process.env
const envIsDevelopment = NODE_ENV === 'development'
const shouldRunCleaners = RUN_CLEANERS === 'true'

const connectionOptions = envIsDevelopment
    ? {
        host: PG_HOST,
        database: PG_DATABASE,
        port: Number(PG_PORT),
        password: PG_PASSWORD,
    }
    : {
        connectionString: DATABASE_URL,
    }

export const database = new Client(connectionOptions)

export const connectToDatabase = async () => {
    await database.connect()

    if (envIsDevelopment && shouldRunCleaners) {
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
