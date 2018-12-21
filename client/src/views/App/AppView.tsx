import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { PageHeader } from '../../components/Chrome/PageHeader/PageHeader'
import { View } from '../../components/Core/Layout/View/View'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { routes } from '../routes'
import { InboxView } from './Inbox/InboxView'

interface Props extends RouteComponentProps {
    className?: string
}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView')

    public render() {
        const { className, history } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                <PageHeader history={history} />
                <Switch>
                    <Route path={routes.app.inbox.index} component={InboxView}/>
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
