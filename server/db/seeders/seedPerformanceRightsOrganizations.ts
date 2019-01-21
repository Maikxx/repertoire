import { CreatePerformanceRightsOrganization } from '../../domains/PerformanceRightsOrganization/CreatePerformanceRightsOrganizationService'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

export const seedPerformanceRightsOrganizations = async (): Promise<void> => {
    console.info('Seeding performance rights organizations...')

    const data = await readFile(path.resolve(__dirname, '../data/performanceRightsOrganizations.json'), 'utf8')
    const performanceRightsOrganizations = JSON.parse(data)

    await Promise.all(performanceRightsOrganizations.map(performanceRightsOrganization =>
        CreatePerformanceRightsOrganization({ performanceRightsOrganization })))

    console.info(`Finished seeding performance rights organizations`)
}
