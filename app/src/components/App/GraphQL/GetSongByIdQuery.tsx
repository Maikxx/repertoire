import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { Text } from '../../Core/Text/Text/Text'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { RefetchFunction, QueryContent } from '../../../types/GraphQL'
import { Song, SongQueryVariables } from '../../../types/Song'

const GET_SONG_QUERY = gql`
    query getSong($byId: Int!, $filters: SongFilterInputType) {
        getSong(byId: $byId, filters: $filters) {
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

export type GetSongQueryRefetchFunction = RefetchFunction<SongQueryVariables>
export type GetSongQueryQueryContent = QueryContent<GetSongQueryResponse>

interface Props {
    children: (apolloProps: GetSongQueryQueryContent) => JSX.Element
    byId: number
}

export class GetSongQuery extends React.Component<Props> {
    public render() {
        const { children, byId } = this.props

        return (
            <Query<GetSongQueryResponse, SongQueryVariables>
                query={GET_SONG_QUERY}
                variables={{ byId }}
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
