import { UserLoginArgs } from '../../api/User/UserLogin.mutation'

export const UserService = () => {
    const GetCurrentUser = async () => {
        return {
            _id: '1',
            createdAt: new Date(),
        }
    }

    const UserLogin = async (args: UserLoginArgs) => {
        console.log(args)

        return {
            userToken: 'Token',
        }
    }

    return {
        GetCurrentUser,
        UserLogin,
    }
}
