import * as React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
import { View } from '../../../../../components/Core/Layout/View/View'
import { Wrap } from '../../../../../components/Core/Layout/Wrap/Wrap'
import { routes } from '../../../../routes'
import { AddPublisherMasterView } from './Master/AddPublisherMasterView'
import { AddPublisherDetailView } from './Detail/AddPublisherDetailView'

interface Props extends RouteComponentProps {}

export class AddPublisherView extends React.Component<Props> {
    public render() {
        return (
            <View>
                <Wrap allSides={true}>
                    <Switch>
                        <Route
                            path={routes.app.dashboard.addPublisher.index}
                            exact={true}
                            component={AddPublisherMasterView}
                        />
                        <Route
                            path={routes.app.dashboard.addPublisher.detail()}
                            component={AddPublisherDetailView}
                        />
                    </Switch>
                </Wrap>
            </View>
        )
    }
}
