import * as React from 'react'
import { BEM } from '../services/BEMService'
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom'
import { CoverView } from './CoverView/CoverView'
import { routes } from './routes'
import { getAuthToken } from '../services/LocalStorageService'
import { AuthenticatedRoute } from '../components/Core/AuthenticatedRoute/AuthenticatedRoute'
import { AppView } from './AppView/AppView'

interface Props extends RouteComponentProps {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView')

    public render() {
        const token = getAuthToken()
        const isAuthenticated = !!token
        const redirectToRoute = isAuthenticated
            ? routes.app.index
            : routes.cover.index

        return (
            <main className={this.bem.getClassName()}>
                <Switch>
                    <AuthenticatedRoute path={routes.app.index} component={AppView}/>
                    <Route path={routes.cover.index} component={CoverView} />
                    <Redirect
                        from={routes.index}
                        exact={true}
                        to={redirectToRoute}
                    />
                </Switch>
            </main>
        )
    }
}
