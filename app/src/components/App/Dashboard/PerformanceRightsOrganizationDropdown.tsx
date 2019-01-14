import * as React from 'react'
import { Select } from '../../Core/DataEntry/Form/Select'
import gql from 'graphql-tag'
import { Text } from '../../Core/Text/Text/Text'
import Query from 'react-apollo/Query'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { toast } from 'react-toastify'
import { PerformanceRightsOrganization } from '../../../types/PerformanceRightsOrganization'

const GET_PERFORMANCE_RIGHTS_ORGANIZATIONS_QUERY = gql`
    query getPerformanceRightsOrganizations {
        getPerformanceRightsOrganizations {
            _id
            name
        }
    }
`

interface Props {
    name: string
}

interface QueryData {
    getPerformanceRightsOrganizations: PerformanceRightsOrganization[]
}

export class PerformanceRightsOrganizationDropdown extends React.Component<Props> {
    public render() {
        return (
            <Query<QueryData> query={GET_PERFORMANCE_RIGHTS_ORGANIZATIONS_QUERY}>
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

                    return this.renderWithData(data)
                }}
            </Query>
        )
    }

    private renderNotFoundText = () => (
        <Text element={`span`} isSubtle={true}>
            There were no performance rights organizations found
        </Text>
    )

    private renderWithData = (data: QueryData) => {
        const options = data.getPerformanceRightsOrganizations.map(performanceRightsOrganization =>
            ({ value: performanceRightsOrganization._id, label: performanceRightsOrganization.name })
        )

        return (
            <Select
                name={name}
                options={options}
                placeholder={`Select a performance rights organization`}
            />
        )
    }
}
