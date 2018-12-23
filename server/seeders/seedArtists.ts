import { getCurrentISOStringDate } from '../services/DateFormatter'
import { UserService } from '../domains/User/UserService'

const artists = [
    {
        name: 'Linkin Park',
        email: 'linkinpark@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'linkinpark',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Avenged Sevenfold',
        email: 'avengedsevenfold@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'avengedsevenfold',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Davina Michelle',
        email: 'davinamichelle@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'davinamichelle',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Coldplay',
        email: 'coldplay@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'coldplay',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Imagine Dragons',
        email: 'imaginedragons@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'imaginedragons',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Illenium',
        email: 'illenium@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'illenium',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Kygo',
        email: 'kygo@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'kygo',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Lumidelic',
        email: 'lumidelic@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'lumidelic',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Armin van Buuren',
        email: 'arminvanbuuren@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'arminvanbuuren',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
    {
        name: 'Estiva',
        email: 'estiva@repertoire.org',
        isAdmin: false,
        isArtist: true,
        isPublisher: false,
        password: 'estiva',
        // tslint:disable-next-line:ter-max-len
        profileImage: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription01&hatColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
    },
]

export const seedArtists = async () => {
    const userService = UserService()
    await Promise.all(artists.map(artist => userService.CreateUser({ user: { ...artist }})))
}
