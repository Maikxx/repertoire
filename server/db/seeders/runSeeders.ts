import { seedPerformanceRightsOrganizations } from './seedPerformanceRightsOrganizations'
import { seedAdminUser } from './seedAdminUser'
import { seedArtists } from './seedArtists'
import { seedCountries } from './seedCountries'
import { seedPublishers } from './seedPublisher'

export const runSeeders = async () => {
    console.info('Running seeders...')
    const startTime = performance.now()

    await seedAdminUser()
    await seedArtists()
    await seedCountries()
    await seedPublishers()
    await seedPerformanceRightsOrganizations()

    const endTime = performance.now()
    console.info(`Finished seeding in ${endTime - startTime}ms`)
}
