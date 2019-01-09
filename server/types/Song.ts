export interface SongInterface {
    _id: number
    composer: string
    title: string
    createdAt: string | Date
}

export interface SongInputTypeInterface {
    title: string
    composer: string
}
