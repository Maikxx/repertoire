import { PerformanceRightsOrganization } from './PerformanceRightsOrganization'

export interface ComposerTypeInterface {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    artist: ArtistTypeInterface
    user: UserTypeInterface
}

export interface ArtistTypeInterface {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    isComposer?: boolean
    composer?: ComposerTypeInterface
    user: UserTypeInterface
}

export interface UserTypeInterface {
    _id: string
    createdAt: string | Date
    email: string
    isAdmin?: boolean
    isArtist?: boolean
    isDistributor?: boolean
    isPerformanceRightsOrganization?: boolean
    name?: string
    password: string
    profileImage?: string
    updatedAt: string | Date
    artist?: ArtistTypeInterface
    performanceRightsOrganization?: PerformanceRightsOrganization
}

export interface UserInputTypeInterface {
    email?: string
    password?: string
    isAdmin?: boolean
    name?: string
    profileImage?: string
}
