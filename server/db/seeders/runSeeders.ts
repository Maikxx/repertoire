import { seedAdminUser } from './seedAdminUser'
import { seedArtists } from './seedArtists'

export const runSeeders = async () => {
    await seedAdminUser()
    await seedArtists()
}
