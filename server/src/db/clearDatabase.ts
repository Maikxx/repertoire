import { database } from './connect'

export const clearDatabase = async () => {
    await database.query(
        `
            DROP TABLE IF EXISTS "artistShares" CASCADE;
            DROP TABLE IF EXISTS countries CASCADE;
            DROP TABLE IF EXISTS "performanceRightsOrganizations" CASCADE;
            DROP TABLE IF EXISTS publishers CASCADE;
            DROP TABLE IF EXISTS songs CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `
    )
}
