import * as React from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { authService } from '../../../services/AuthService'
import { routes } from '../../../views/routes'

interface Props extends RouteProps {
    component: any
}

export class AuthenticatedRoute extends React.Component<Props> {
    public render() {
        const { component: Component, ...restProps } = this.props

        return (
            <Route
                {...restProps}
                render={props => (
                    authService.isAuthenticated === true
                        ? <Component {...props} />
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
