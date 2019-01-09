import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { View } from '../../components/Core/Layout/View/View'
import { RouteComponentProps, Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../routes'
import { DashboardView } from './Dashboard/DashboardView'

interface Props extends RouteComponentProps {}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView', () => ({
        'highlight-background': this.isCurrentLocationHighlighted(),
    }))

    public render() {
        return (
            <View className={this.bem.getClassName()}>
                <Switch>
                    <Route path={routes.app.dashboard.index} component={DashboardView}/>
                    <Redirect from={routes.app.index} to={routes.app.dashboard.index}/>
                </Switch>
            </View>
        )
    }

    private isCurrentLocationHighlighted = () => {
        const { location } = this.props

        if (location.pathname !== routes.app.dashboard.index) {
            return false
        }

        return true
    }
}
