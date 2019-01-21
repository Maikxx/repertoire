import * as React from 'react'
import { PageHeader } from '../../components/Chrome/PageHeader/PageHeader'
import { View } from '../../components/Core/Layout/View/View'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { routes } from '../routes'
import { InboxView } from './Inbox/InboxView'
import { UserView } from './User/UserView'

interface Props extends RouteComponentProps {}

export class AppView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <View>
                <PageHeader history={history} />
                <Switch>
                    <Route path={routes.app.inbox.index} component={InboxView}/>
                    <Route path={routes.app.currentUser} component={UserView}/>
                    <Redirect
                        from={routes.app.index}
                        exact={true}
                        to={routes.app.inbox.index}
                    />
                </Switch>
            </View>
        )
    }
}
