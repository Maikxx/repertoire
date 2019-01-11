import { seedAdminUser } from './seedAdminUser'
import { seedArtists } from './seedArtists'
import { seedCountries } from './seedCountries'
import { seedPublishers } from './seedPublisher'

export const runSeeders = async () => {
    await seedAdminUser()
    await seedArtists()
    await seedCountries()
    await seedPublishers()
}
