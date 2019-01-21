import { GraphQLList } from 'graphql'
import { PerformanceRightsOrganizationType } from './PerformanceRightsOrganization.type'
import { GetPerformanceRightsOrganizations } from '../../domains/PerformanceRightsOrganization/GetPerformanceRightsOrganizationsService'

export const getPerformanceRightsOrganizations = () => ({
    type: new GraphQLList(PerformanceRightsOrganizationType),
    resolve: () => GetPerformanceRightsOrganizations(),
})
