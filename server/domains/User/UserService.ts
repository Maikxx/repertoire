import { ApolloError } from 'apollo-server-express'
import { encrypt, compare } from '../../services/Encrypter'
import { encodeToken } from '../../services/TokenManager'
import { getCurrentISOStringDate, getDateFromISOString } from '../../services/DateFormatter'
import { User } from '../../models/User'
import { AuthArgs } from '../../api/User/userLogin.mutation'
import * as mongoose from 'mongoose'
import { UpdateUserArgs } from '../../api/User/updateUser.mutation'
import { CreateUserArgs } from '../../api/User/createUser.mutation'
import { DeleteUserArgs } from '../../api/User/deleteUser.mutation'

export const UserService = () => {
    const GetUserData = (args?: CreateUserArgs | UpdateUserArgs, update = false) => {
        if (!args) {
            throw new ApolloError('No arguments were found', '400')
        }

        const email = args.user.email
        const password = encrypt(args.user.password)
        // const isAdmin = args.user.isAdmin

        const createdAt = getCurrentISOStringDate()
        const updatedAt = getCurrentISOStringDate()

        const userData = {
            _id: null,
            email: null,
            password: null,
            createdAt: null,
            updatedAt: null,
            // isAdmin: null,
        }

        if (email) {
            userData.email = email
        }

        if (password) {
            userData.password = password
        }

        // if (isAdmin === true || isAdmin === false) {
        //     userData.isAdmin = isAdmin
        // }

        if (update) {
            userData.updatedAt = updatedAt
        } else {
            userData._id = mongoose.Types.ObjectId(),
            userData.createdAt = createdAt
            userData.updatedAt = updatedAt
        }

        return userData
    }

    const GetMe = async (_id: string) => {
        try {
            const users = await User.find({ _id })

            if (!users || !users.length) {
                throw new Error('No user found with this identifier')
            }

            const me = users[0]
            return me
        } catch (error) {
            throw new ApolloError('No user found with this identifier', '404')
        }
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

    const CreateUser = async (args: CreateUserArgs) => {
        const newUserData = GetUserData(args)
        try {
            const newUser = new User(newUserData)
            const users = await GetUsersByField('email', newUserData.email)

            if (users && users.length > 0) {
                throw new ApolloError('User already exists', '409')
            }

            const user = await newUser.save() as any
            const token = encodeToken({
                id: user._id,
                email: user.email,
                createdAt: user.createdAt,
            })

            return {
                token,
            }
        } catch (error) {
            throw new ApolloError(error.message, '500')
        }
    }

    const UpdateUser = async (args: UpdateUserArgs) => {
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

    const UserLogin = async (args: AuthArgs): Promise<any> => {
        const email = args.auth.email
        const password = args.auth.password
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

            return {
                token,
            }
        }

        throw new ApolloError('Email and/or password do not match', '409')
    }

    return {
        CreateUser,
        DeleteUser,
        GetMe,
        GetUserById,
        GetUsers,
        GetUsersByField,
        UpdateUser,
        UserLogin,
    }
}
