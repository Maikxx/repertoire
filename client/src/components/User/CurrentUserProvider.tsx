import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_CURRENT_USER_QUERY = gql`
    query {
        me {
            _id
            email
        }
    }
`

interface CurrentUserResponse {
    me: {
        _id: string
        name: string
    }
}

interface Props {
    children: any
}

export class CurrentUserProvider extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query<CurrentUserResponse> query={GET_CURRENT_USER_QUERY}>
                {({ data, loading, refetch, error }) => children({ error, loading, data, refetch })}
            </Query>
        )
    }
}
