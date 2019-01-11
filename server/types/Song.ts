import { GraphQLCountryInterface } from './Country'

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
    creatorShares: number[]
    country: number
    pro?: string
    createdAt: string
}

export interface GraphQLSongInterface {
    _id: number
    title: string
    composer: ArtistShareInterface
    creators?: ArtistShareInterface[]
    country?: GraphQLCountryInterface
    pro?: string
    createdAt: string
}

export interface SongInputTypeInterface {
    title: string
    composer: ArtistShareInputInterface
    creators?: ArtistShareInputInterface[]
    country?: number
    pro?: string
}
