export const UserService = () => {
    const GetCurrentUser = async () => {
        return {
            _id: '1',
            createdAt: new Date(),
        }
    }

    return {
        GetCurrentUser,
    }
}
