import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Publisher } from '../../../types/Publisher'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'

const GET_PUBLISHERS_QUERY = gql`
    query {
        getPublishers {
            _id
            name
            role
            createdAt
        }
    }
`

interface Props {
    children: (apolloProps: GetSongQueryQueryContent) => JSX.Element
}

export type GetSongQueryRefetchFunction = RefetchFunction<{}>
export type GetSongQueryQueryContent = QueryContent<GetPublishersQueryResponse>

export interface GetPublishersQueryResponse {
    getPublishers: Publisher[]
}

export class GetPublishersQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<GetPublishersQueryResponse> query={GET_PUBLISHERS_QUERY}>
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
            There were no publishers found
        </Text>
    )
}
