import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'
import { Song } from '../../../types/Song'

const GET_SONGS_QUERY = gql`
    query getSongs {
        getSongs {
            _id
            title
            composer {
                _id
                name
                share
            }
            creators {
                _id
                name
                share
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
            createdAt
        }
    }
`

export interface GetSongsQueryResponse {
    getSongs: Song[]
}

export type GetSongsQueryRefetchFunction = RefetchFunction<GetSongsQueryResponse>
export type GetSongsQueryQueryContent = QueryContent<GetSongsQueryResponse>

interface Props {
    children: (apolloProps: GetSongsQueryQueryContent) => JSX.Element
}

export class GetSongsQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<GetSongsQueryResponse> query={GET_SONGS_QUERY}>
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
