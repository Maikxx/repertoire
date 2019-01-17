import { PublisherInputTypeInterface, GraphQLPublisherInterface } from './Publisher'
import { GraphQLCountryInterface } from './Country'

export interface SongQueryArgs {
    byId?: number
    filters?: {
        filterByIsAccepted?: boolean
    }
}

export interface ArtistShareInterface {
    _id: number
    name: string
    share: number
    role: string
    createdAt: string
}

export interface ArtistShareInputInterface {
    name: string
    share: number
    role?: string
}

export interface DatabaseSongInterface {
    _id: number
    title: string
    composerShare: number
    creatorShares?: number[]
    country?: number
    performanceRightsOrganization?: number
    accepted: boolean
    publishers?: number[]
    createdAt: string
}

export interface GraphQLSongInterface {
    _id: number
    title: string
    composer: ArtistShareInterface
    creators?: ArtistShareInterface[]
    country?: GraphQLCountryInterface
    performanceRightsOrganization?: string
    publishers?: GraphQLPublisherInterface[]
    accepted: boolean
    createdAt: string
}

export interface SongInputTypeInterface {
    title: string
    composer: ArtistShareInputInterface
    creators?: ArtistShareInputInterface[]
    country?: number
    publishers?: PublisherInputTypeInterface[]
    createdAt?: string
    accepted: boolean
    performanceRightsOrganization?: number
}
