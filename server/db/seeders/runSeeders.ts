import { seedPerformanceRightsOrganizations } from './seedPerformanceRightsOrganizations'
import { seedAdminUser } from './seedAdminUser'
import { seedCountries } from './seedCountries'
import { seedPublishers } from './seedPublisher'

export const runSeeders = async () => {
    console.info('Running seeders...')

    await seedAdminUser()
    await seedCountries()
    await seedPublishers()
    await seedPerformanceRightsOrganizations()

    console.info(`Finished seeding`)
}
