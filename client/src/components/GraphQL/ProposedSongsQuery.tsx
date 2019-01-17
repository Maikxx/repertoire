import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { RefetchFunction, QueryContent } from '../../types/GraphQL'
import { Loader } from '../Core/Feedback/Loader/Loader'
import { Text } from '../Core/Text/Text/Text'
import { Song, SongQueryVariables } from '../../types/Song'

const GET_SONGS_QUERY = gql`
    query getSongs($filters: SongFilterInputType) {
        getSongs(filters: $filters) {
            _id
            title
            composer {
                _id
                name
                share
                role
            }
            creators {
                _id
                name
                share
                role
            }
            country {
                _id
                name
                code
            }
            performanceRightsOrganization {
                _id
                name
            }
            publishers {
                _id
                name
                role
            }
            accepted
            createdAt
        }
    }
`

export interface ProposedSongsQueryResponse {
    getSongs: Song[]
}

export type ProposedSongsQueryRefetchFunction = RefetchFunction<ProposedSongsQueryResponse>
export type ProposedSongsQueryQueryContent = QueryContent<ProposedSongsQueryResponse>

interface Props {
    children: (apolloProps: ProposedSongsQueryQueryContent) => JSX.Element | JSX.Element[] | null
    variables?: SongQueryVariables
    pollInterval?: number
}

export class ProposedSongsQuery extends React.Component<Props> {
    public render() {
        const { children, ...restProps } = this.props

        return (
            <Query<ProposedSongsQueryResponse>
                query={GET_SONGS_QUERY}
                {...restProps}
            >
                {({ data, loading, error }) => {
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
            There were no songs found
        </Text>
    )
}
