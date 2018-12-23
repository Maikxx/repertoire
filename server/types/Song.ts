export interface Song {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    coverImage?: string
    dateOfRecording: string | Date
    location?: string
    name: string
}
