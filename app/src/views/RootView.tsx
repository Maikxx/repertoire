import * as React from 'react'
import { BEM } from '../services/BEMService'
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom'
import { CoverView } from './Cover/CoverView'
import { routes } from './routes'
import { getAuthToken } from '../services/LocalStorageService'
import { AuthenticatedRoute } from '../components/Core/AuthenticatedRoute/AuthenticatedRoute'
import { AppView } from './App/AppView'
import { View } from '../components/Core/Layout/View/View'
import { ToastContainer, ToastPosition } from 'react-toastify'

interface Props extends RouteComponentProps {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView', () => ({
        'gradient-background': this.props.location.pathname.includes(routes.cover.index),
    }))

    public render() {
        const token = getAuthToken()
        const isAuthenticated = !!token
        const redirectToRoute = isAuthenticated
            ? routes.app.index
            : routes.cover.index

        return (
            <View
                className={this.bem.getClassName()}
                isMain={true}
            >
                <Switch>
                    <AuthenticatedRoute
                        path={routes.app.index}
                        component={AppView}
                    />
                    <Route
                        path={routes.cover.index}
                        component={CoverView}
                    />
                    <Redirect
                        from={routes.index}
                        exact={true}
                        to={redirectToRoute}
                    />
                </Switch>
                <ToastContainer position={ToastPosition.BOTTOM_CENTER} autoClose={2000} />
            </View>
        )
    }
}
