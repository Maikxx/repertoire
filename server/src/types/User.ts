export interface UserTypeInterface {
    _id: number
    createdAt: Date
    email: string
    isAdmin?: boolean
    isArtist?: boolean
    name?: string
    password: string
    profileImage?: string
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
