export interface SongInterface {
    _id: number
    composer: string
    title: string
    createdAt: string
}

export interface SongInputTypeInterface {
    title: string
    composer: string
    composerShare: number
}
