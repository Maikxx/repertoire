import * as React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
import { View } from '../../../../../components/Core/Layout/View/View'
import { Wrap } from '../../../../../components/Core/Layout/Wrap/Wrap'
import { routes } from '../../../../routes'
import { AddCreatorMasterView } from './Master/AddCreatorMasterView'
import { AddCreatorDetailView } from './Detail/AddCreatorDetailView'

interface Props extends RouteComponentProps {}

export class AddCreatorView extends React.Component<Props> {
    public render() {
        return (
            <View>
                <Wrap allSides={true}>
                    <Switch>
                        <Route
                            path={routes.app.dashboard.addCreator.index}
                            exact={true}
                            component={AddCreatorMasterView}
                        />
                        <Route
                            path={routes.app.dashboard.addCreator.detail()}
                            component={AddCreatorDetailView}
                        />
                    </Switch>
                </Wrap>
            </View>
        )
    }
}
