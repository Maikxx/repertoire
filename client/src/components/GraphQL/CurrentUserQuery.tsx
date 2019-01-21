import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import { QueryContent, RefetchFunction } from '../../types/GraphQL'
import { Loader } from '../Core/Feedback/Loader/Loader'
import { Text } from '../Core/Text/Text/Text'
import { User } from '../../types/User'

const GET_CURRENT_USER_QUERY = gql`
    query me {
        me {
            _id
            name
            email
            isAdmin
            createdAt
        }
    }
`

export interface GetCurrentUserQueryResponse {
    me: User
}

export type GetCurrentUserQueryRefetchFunction = RefetchFunction<{}>
export type GetCurrentUserQueryQueryContent = QueryContent<GetCurrentUserQueryResponse>

interface Props {
    children: (apolloProps: GetCurrentUserQueryQueryContent) => JSX.Element | null
}

export class GetCurrentUserQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<GetCurrentUserQueryResponse> query={GET_CURRENT_USER_QUERY}>
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
            You are not logged in, you will now be redirected...
        </Text>
    )
}
