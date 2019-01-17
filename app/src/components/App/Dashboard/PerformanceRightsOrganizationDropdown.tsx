import * as React from 'react'
import { Select } from '../../Core/DataEntry/Form/Select'
import { GetPerformanceRightsOrganizationsQuery, GetPerformanceRightsOrganizationsQueryResponse } from '../GraphQL/GetPerformanceRightsOrganizations'

interface Props {
    name: string
}

export class PerformanceRightsOrganizationDropdown extends React.Component<Props> {
    public render() {
        return (
            <GetPerformanceRightsOrganizationsQuery>
                {({ data }) => this.renderWithData(data)}
            </GetPerformanceRightsOrganizationsQuery>
        )
    }

    private renderWithData = (data?: GetPerformanceRightsOrganizationsQueryResponse) => {
        const { name } = this.props
        const options = data && data.getPerformanceRightsOrganizations.map(performanceRightsOrganization =>
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
