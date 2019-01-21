import { encrypt } from '../../services/Encrypter'
import { ApolloError } from 'apollo-server-core'
import { CreateUserArgs } from '../../api/User/createUser.mutation'
import { UpdateUserArgs } from '../../api/User/updateUser.mutation'

export const GetUserData = (args?: CreateUserArgs | UpdateUserArgs) => {
    if (!args) {
        throw new ApolloError('No arguments were found', '400')
    }

    const {
        email,
        password,
        isAdmin,
        isArtist,
        name,
        isPublisher,
        profileImage,
    } = args.user

    const encryptedPassword = encrypt(password)

    const userData = {
        email: null,
        name: null,
        password: null,
        isAdmin: null,
        isArtist: null,
        isPublisher: null,
        profileImage: null,
    }

    if (email) {
        userData.email = email
    }

    if (encryptedPassword) {
        userData.password = encryptedPassword
    }

    if (name) {
        userData.name = name
    }

    if (profileImage) {
        userData.profileImage = profileImage
    }

    if (isAdmin === true || isAdmin === false) {
        userData.isAdmin = isAdmin
    }

    if (isArtist === true || isArtist === false) {
        userData.isArtist = isArtist
    }

    if (isPublisher === true || isPublisher === false) {
        userData.isPublisher = isPublisher
    }

    return userData
}
