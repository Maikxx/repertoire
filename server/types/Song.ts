import { ComposerTypeInterface } from './User'
import { PublisherTypeInterface } from './Publisher'

export interface Song {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    composers?: ComposerTypeInterface[]
    coverImage?: string
    dateOfRecording: string | Date
    location?: string
    publishers?: PublisherTypeInterface[]
    name: string
}
