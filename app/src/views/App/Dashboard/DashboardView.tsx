import * as React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router'
import { View } from '../../../components/Core/Layout/View/View'
import { routes } from '../../routes'
import { DashboardMasterView } from './Master/DashboardMasterView'
import { Background } from '../../../components/Core/Background/Background'
import { PageHeader } from '../../../components/Chrome/PageHeader/PageHeader'

interface Props extends RouteComponentProps {}

export class DashboardView extends React.Component<Props> {
    public render() {
        const { history, location } = this.props

        return (
            <View>
                <Background />
                <PageHeader
                    history={history}
                    location={location}
                />
                <Switch>
                    <Route
                        path={routes.app.dashboard.index}
                        exact={true}
                        component={DashboardMasterView}
                    />
                </Switch>
            </View>
        )
    }
}
