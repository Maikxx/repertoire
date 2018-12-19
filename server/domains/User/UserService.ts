import { ApolloError } from 'apollo-server-express'
import { encrypt, compare } from '../../services/Encrypter'
import { encodeToken } from '../../services/TokenManager'
import { getCurrentISOStringDate } from '../../services/DateFormatter'
import { User } from '../../models/User'
import { AuthArgs } from '../../api/User/userLogin.mutation'

interface UserDataArgs {
    _id?: string
    user: {
        email: string
        password: string
    }
}

interface DeleteUserArgs {
    _id: string
}

export const UserService = () => {
    const GetCurrentUser = async () => {
        return {
            _id: '1',
            createdAt: new Date(),
        }
    }

    const GetUserData = (args?: UserDataArgs, update = false) => {
        if (!args) {
            throw new ApolloError('No arguments were found', '400')
        }

        const email = args.user.email
        const password = encrypt(args.user.password)
        const createdAt = getCurrentISOStringDate()
        const updatedAt = getCurrentISOStringDate()

        const userData = {
            email: null,
            password: null,
            createdAt: null,
            updatedAt: null,
        }

        if (email) {
            userData.email = email
        }

        if (password) {
            userData.password = password
        }

        if (update) {
            userData.updatedAt = updatedAt
        } else {
            userData.createdAt = createdAt
            userData.updatedAt = updatedAt
        }

        return userData
    }

    const GetUsersByField = async (field: string, value: string): Promise<any[]> => {
        const fields = {}
        fields[field] = value

        try {
            const users = await User.find(fields)
            return users
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const CreateUser = async (args: UserDataArgs) => {
        const newUserData = GetUserData(args)
        try {
            const newUser = new User(newUserData)
            const users = await GetUsersByField('email', newUserData.email)

            if (users || users.length > 0) {
                throw new ApolloError('User already exists', '409')
            }

            const response = await newUser.save()
            return response
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const UpdateUser = async (args: UserDataArgs) => {
        const { _id } = args
        const updatedUserData = GetUserData(args, true)

        try {
            const response = await User.findByIdAndUpdate({ _id }, { $set: updatedUserData }, { new: true })
            return response
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const GetUsers = async () => {
        try {
            const response = await User.find({})
            return response
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const GetUserById = async (id: string) => {
        try {
            const response = await User.find({ _id: id })

            if (response && response.length > 0) {
                return response[0]
            }

            throw new ApolloError('No user found with this id', '404')
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const DeleteUser = async (args: DeleteUserArgs) => {
        const { _id } = args

        try {
            const response = await User.findByIdAndRemove(_id)
            return response
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const UserLogin = async (args: AuthArgs): Promise<string> => {
        const email = args.auth && args.auth.email
        const password = args.auth && args.auth.password
        const userService = UserService()

        const users = await userService.GetUsersByField('email', email)

        if (!users || !users.length) {
            throw new ApolloError('User not found', '404')
        }

        const user = users[0]
        const hashPassword = user.password

        if (compare(password, hashPassword)) {
            const token = encodeToken({
                id: user._id,
                email: user.email,
                createdAt: getCurrentISOStringDate(),
            })

            return token
        }

        throw new ApolloError('Email and/or password do not match', '409')
    }

    return {
        CreateUser,
        DeleteUser,
        GetCurrentUser,
        GetUserById,
        GetUsers,
        GetUsersByField,
        UpdateUser,
        UserLogin,
    }
}
