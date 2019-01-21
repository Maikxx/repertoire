import { CreateUser } from '../../domains/User/CreateUserService'

export const seedAdminUser = async () => {
    console.info('Seeding admin user...')

    const user = {
        name: 'Admin',
        email: 'admin@repertoire.org',
        isAdmin: true,
        isArtist: false,
        isPublisher: false,
        password: 'admin',
    }

    await CreateUser({ user })

    console.info(`Finished seeding admin user`)
}
