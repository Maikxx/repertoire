import * as React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
import { View } from '../../../components/Core/Layout/View/View'
import { routes } from '../../routes'
import { DashboardMasterView } from './Master/DashboardMasterView'
import { PageHeader } from '../../../components/Chrome/PageHeader/PageHeader'
import { RegisterSongView } from './Detail/RegisterSongView'
import { AddCreatorView } from './Detail/AddCreator/AddCreatorView'
import { AddPublisherView } from './Detail/AddPublisher/AddPublisherView'

interface Props extends RouteComponentProps {}

export class DashboardView extends React.Component<Props> {
    public render() {
        const { history, location } = this.props

        return (
            <View>
                <PageHeader
                    history={history}
                    location={location}
                />
                <Switch>
                    <Route
                        path={routes.app.dashboard.register}
                        component={RegisterSongView}
                    />
                    <Route
                        path={routes.app.dashboard.addCreator.index}
                        component={AddCreatorView}
                    />
                    <Route
                        path={routes.app.dashboard.addPublisher.index}
                        component={AddPublisherView}
                    />
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
