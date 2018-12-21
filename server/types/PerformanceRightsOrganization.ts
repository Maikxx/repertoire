import { UserTypeInterface } from './User'

export interface PerformanceRightsOrganization {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    user: UserTypeInterface
}
