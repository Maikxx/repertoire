import { UserService } from '../domains/User/UserService'

export const seedAdminUser = async () => {
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

    const userService = UserService()
    await userService.CreateUser({ user: { ...user }})
}
