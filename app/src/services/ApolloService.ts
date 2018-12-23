import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { getAuthToken } from './LocalStorageService'

const authLink = setContext((_, { headers }) => {
    const token = getAuthToken()

    return {
        headers: {
            ...headers,
            authorization: token
                ? `Bearer ${token}`
                : '',
        },
    }
})

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' })

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})
