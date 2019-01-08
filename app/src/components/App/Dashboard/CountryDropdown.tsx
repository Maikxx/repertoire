import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Select } from '../../Core/DataEntry/Form/Select'
import { Country } from '../../../types/Country'

const GET_COUNTRIES_QUERY = gql`
    query getCountries {
        getCountries {
            _id
            name
        }
    }
`

interface Props {}

interface QueryData {
    getCountries: Country[]
}

export class CountryDropdown extends React.Component<Props> {
    public render() {
        return (
            <Query<QueryData, {}> query={GET_COUNTRIES_QUERY}>
                {({ loading, data }) => {
                    if (loading) {
                        return <span>Loading...</span>
                    }

                    if (!data) {
                        return <span>No results</span>
                    }

                    const options = data.getCountries.map(country => ({ value: country._id, label: country.name }))

                    return (
                        <Select
                            name={`location`}
                            options={options}
                            placeholder={`This song is recorded in`}
                        />
                    )
                }}
            </Query>
        )
    }
}
