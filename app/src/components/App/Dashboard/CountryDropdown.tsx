import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Select } from '../../Core/DataEntry/Form/Select'
import { Country } from '../../../types/Country'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { Text } from '../../Core/Text/Text/Text'

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
            <Query<QueryData> query={GET_COUNTRIES_QUERY}>
                {({ loading, data, error }) => {
                    if (loading) {
                        return <Loader />
                    }

                    if (!data || error) {
                        return this.renderNotFoundText()
                    }

                    return this.renderWithData(data)
                }}
            </Query>
        )
    }

    private renderNotFoundText = () => (
        <Text element={`span`} isSubtle={true}>
            There were no countries found
        </Text>
    )

    private renderWithData = (data: QueryData) => {
        const options = data.getCountries.map(country => ({ value: country._id, label: country.name }))

        return (
            <Select
                name={`location`}
                options={options}
                placeholder={`This song is recorded in`}
            />
        )
    }
}
