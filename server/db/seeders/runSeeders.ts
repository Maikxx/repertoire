import { seedAdminUser } from './seedAdminUser'
import { seedArtists } from './seedArtists'
import { seedCountries } from './seedCountries'

export const runSeeders = async () => {
    await seedAdminUser()
    await seedArtists()
    await seedCountries()
}
