import { UserTypeInterface } from './User'

export interface PublisherTypeInterface {
    _id: string
    createdAt: string | Date
    updatedAt: string | Date
    user: UserTypeInterface
}
