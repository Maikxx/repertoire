import { ArtistShare } from './SongCreator'
import { Country } from './Country'
import { PerformanceRightsOrganization } from './PerformanceRightsOrganization'
import { Publisher } from './Publisher'

export interface Song {
    _id: number
    title: string
    composer: ArtistShare
    creators?: ArtistShare[]
    country?: Country
    performanceRightsOrganization?: PerformanceRightsOrganization
    publisher?: Publisher
}