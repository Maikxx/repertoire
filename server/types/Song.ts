export interface ArtistShareInterface {
    _id: number
    name: string
    share: number
    createdAt: string
}

export interface ArtistShareInputInterface {
    name: string
    share: number
}

export interface DatabaseSongInterface {
    _id: number
    composerShareId: number
    createdAt: string
}

export interface GraphQLSongInterface {
    _id: number
    composer: ArtistShareInterface
    title: string
    createdAt: string
}

export interface SongInputTypeInterface {
    title: string
    composer: ArtistShareInputInterface
    creators: ArtistShareInputInterface[]
}
