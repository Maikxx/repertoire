export interface SongCreatorInputType {
    name: string
    share: number
    role?: string
}

export interface ArtistShare {
    _id: number
    name: string
    share: number
    role: string
    createdAt: number
}
