import { CreatePerformanceRightsOrganization } from '../../domains/PerformanceRightsOrganization/CreatePerformanceRightsOrganizationService'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import fetch from 'node-fetch'
require('dotenv').config()
const { NODE_ENV } = process.env

export const seedPerformanceRightsOrganizations = async (): Promise<void> => {
    console.info('Seeding performance rights organizations...')

    if (NODE_ENV === 'development') {
        const readFile = promisify(fs.readFile)
        const data = await readFile(path.resolve(__dirname, '../data/performanceRightsOrganizations.json'), 'utf8')
        const performanceRightsOrganizations = JSON.parse(data)

        await Promise.all(performanceRightsOrganizations.map(performanceRightsOrganization =>
            CreatePerformanceRightsOrganization({ performanceRightsOrganization })))
    } else {
        const response = await fetch('https://api.jsonbin.io/b/5c4719d504ce8017ee2808cf')
        const performanceRightsOrganizations = await response.json()
        await Promise.all(performanceRightsOrganizations.map(performanceRightsOrganization =>
            CreatePerformanceRightsOrganization({ performanceRightsOrganization })))
    }

    console.info(`Finished seeding performance rights organizations`)
}
