import * as React from 'react'
import { Select } from '../../Core/DataEntry/Form/Select'
import { GetCountriesQuery, GetCountriesQueryResponse } from '../GraphQL/GetCountriesQuery'

interface Props {
    name: string
    placeholder?: string
}

export class CountryDropdown extends React.Component<Props> {
    public render() {
        return (
            <GetCountriesQuery>
                {({ data }) => this.renderWithData(data)}
            </GetCountriesQuery>
        )
    }

    private renderWithData = (data?: GetCountriesQueryResponse) => {
        const { ...restProps } = this.props
        const options = data && data.getCountries.map(country => ({ value: country._id, label: country.name }))

        return (
            <Select
                options={options}
                {...restProps}
            />
        )
    }
}
