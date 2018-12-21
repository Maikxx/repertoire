export interface UserTypeInterface {
    _id: string
    createdAt: string | Date
    email: string
    isAdmin?: boolean
    name?: string
    password: string
    profileImage?: string
    updatedAt: string | Date
}

export interface UserInputTypeInterface {
    email?: string
    password?: string
    isAdmin?: boolean
    name?: string
    profileImage?: string
}
