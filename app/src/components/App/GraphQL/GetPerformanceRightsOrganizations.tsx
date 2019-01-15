import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'
import { PerformanceRightsOrganization } from '../../../types/PerformanceRightsOrganization'

const GET_PERFORMANCE_RIGHTS_ORGANIZATIONS_QUERY = gql`
    query {
        getPerformanceRightsOrganizations {
            _id
            name
            createdAt
        }
    }
`

interface Props {
    children: (apolloProps: GetPerformanceRightsOrganizationsQueryQueryContent) => JSX.Element
}

export type GetPerformanceRightsOrganizationsQueryRefetchFunction = RefetchFunction<{}>
export type GetPerformanceRightsOrganizationsQueryQueryContent = QueryContent<GetPerformanceRightsOrganizationsQueryResponse>

export interface GetPerformanceRightsOrganizationsQueryResponse {
    getPerformanceRightsOrganizations: PerformanceRightsOrganization[]
}

export class GetPerformanceRightsOrganizationsQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<GetPerformanceRightsOrganizationsQueryResponse> query={GET_PERFORMANCE_RIGHTS_ORGANIZATIONS_QUERY}>
                {({ loading, data, error }) => {
                    if (loading) {
                        return <Loader />
                    }

                    if (error) {
                        toast.error(error.message)
                    }

                    if (!data) {
                        return this.renderNotFoundText()
                    }

                    return children({ loading, data, error })
                }}
            </Query>
        )
    }

    private renderNotFoundText = () => (
        <Text element={`span`} isSubtle={true}>
            There were no performance rights organizations found
        </Text>
    )
}
