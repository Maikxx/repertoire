import * as React from 'react'
import { BEM } from '../services/BEMService'
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom'
import { CoverView } from './CoverView/CoverView'
import { routes } from './routes'

interface Props extends RouteComponentProps {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView')

    public render() {
        return (
            <main className={this.bem.getClassName()}>
                <Switch>
                    <Route path={routes.cover.index} component={CoverView} />
                    <Redirect from={routes.index} exact={true} to={routes.cover.index}/>
                </Switch>
            </main>
        )
    }
}
