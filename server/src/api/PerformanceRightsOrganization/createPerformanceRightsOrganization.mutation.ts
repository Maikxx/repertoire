import { GraphQLNonNull } from 'graphql'
import { PublisherInputTypeInterface } from '../../types/Publisher'
import { CreatePerformanceRightsOrganization } from '../../domains/PerformanceRightsOrganization/CreatePerformanceRightsOrganizationService'
import { PerformanceRightsOrganizationType, PerformanceRightsOrganizationInputType } from './PerformanceRightsOrganization.type'

export interface CreatePerformanceRightsOrganizationArgs {
    performanceRightsOrganization: PublisherInputTypeInterface
}

export const createPerformanceRightsOrganization = () => ({
    type: PerformanceRightsOrganizationType,
    args: {
        country: {
            type: new GraphQLNonNull(PerformanceRightsOrganizationInputType),
            required: true,
        },
    },
    resolve: (_, args: CreatePerformanceRightsOrganizationArgs) => CreatePerformanceRightsOrganization(args),
})
