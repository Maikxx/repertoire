import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'
import { Song } from '../../../types/Song'

const GET_SONG_QUERY = gql`
    query getSong($_id: Int!) {
        getSong(_id: $_id) {
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

export interface GetSongQueryResponse {
    getSong: Song
}

export interface GetSongQueryVariables {
    _id: number
}

export type GetSongQueryRefetchFunction = RefetchFunction<GetSongQueryVariables>
export type GetSongQueryQueryContent = QueryContent<GetSongQueryResponse>

interface Props {
    children: (apolloProps: GetSongQueryQueryContent) => JSX.Element
    byId: number
}

export class GetSongQuery extends React.Component<Props> {
    public render() {
        const { children, byId } = this.props

        return (
            <Query<GetSongQueryResponse, GetSongQueryVariables>
                query={GET_SONG_QUERY}
                variables={{ _id: byId }}
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
            There was no song found
        </Text>
    )
}
