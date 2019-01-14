import { database } from '../../db/connect'
import { ApolloError } from 'apollo-server-core'
import { CreatePerformanceRightsOrganizationArgs } from '../../api/PerformanceRightsOrganization/createPerformanceRightsOrganization.mutation'

export const CreatePerformanceRightsOrganization = async (args: CreatePerformanceRightsOrganizationArgs) => {
    const { name } = args.performanceRightsOrganization

    try {
        const { rows: insertRows } = await database.query(
            `INSERT INTO "performanceRightsOrganizations" (
                name
            ) VALUES (
                $1
            ) RETURNING *;`,
            [name]
        )

        const performanceRightsOrganization = insertRows[0]
        return { performanceRightsOrganization }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
