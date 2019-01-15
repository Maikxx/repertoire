import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'
import { Country } from '../../../types/Country'

const GET_COUNTRIES_QUERY = gql`
    query getCountries {
        getCountries {
            _id
            name
            code
            createdAt
        }
    }
`

interface Props {
    children: (apolloProps: GetCountriesQueryQueryContent) => JSX.Element
}

export type GetCountriesQueryRefetchFunction = RefetchFunction<{}>
export type GetCountriesQueryQueryContent = QueryContent<GetCountriesQueryResponse>

export interface GetCountriesQueryResponse {
    getCountries: Country[]
}

export class GetCountriesQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<GetCountriesQueryResponse> query={GET_COUNTRIES_QUERY}>
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
            There were no countries found
        </Text>
    )
}
