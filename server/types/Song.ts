export interface Song {
    _id: number
    createdAt: string | Date
    coverImage?: string
    dateOfRecording: string | Date
    location?: string
    name: string
}
