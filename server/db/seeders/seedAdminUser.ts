import { CreateUser } from '../../domains/User/CreateUserService'

export const seedAdminUser = async () => {
    console.info('Seeding admin user...')
    const startTime = performance.now()

    const user = {
        name: 'Admin',
        email: 'admin@repertoire.org',
        isAdmin: true,
        isArtist: false,
        isPublisher: false,
        password: 'admin',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    }

    await CreateUser({ user: { ...user }})

    const endTime = performance.now()
    console.info(`Finished seeding admin user in ${endTime - startTime}ms`)
}
