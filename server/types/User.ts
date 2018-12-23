export interface UserTypeInterface {
    _id: string
    createdAt: Date
    email: string
    isAdmin?: boolean
    isArtist?: boolean
    name?: string
    password: string
    profileImage?: string
    updatedAt: Date
}

export interface UserInputTypeInterface {
    email?: string
    password?: string
    isAdmin?: boolean
    isArtist?: boolean
    isPublisher?: boolean
    name?: string
    profileImage?: string
}
