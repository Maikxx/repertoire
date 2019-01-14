import * as React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { routes } from '../../../views/routes'
import { getAuthToken } from '../../../services/LocalStorageService'
import { toast } from 'react-toastify'

interface Props extends RouteProps {
    component: any
}

export class AuthenticatedRoute extends React.Component<Props> {
    public render() {
        const { component: Component, ...restProps } = this.props
        const authToken = getAuthToken()

        if (!authToken) {
            toast.error('You are not logged in, you will be redirected')
        }

        return (
            <Route
                {...restProps}
                render={props => (
                    authToken
                        ? (
                            <Component {...props} />
                        )
                        : (
                            <Redirect
                                to={{
                                    pathname: routes.cover.login,
                                    state: { from: props.location },
                                }}
                            />
                        )
                )}
            />
        )
    }
}
