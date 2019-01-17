import * as React from 'react'
import { View } from '../../../components/Core/Layout/View/View'
import { Row } from '../../../components/Core/Layout/Row/Row'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'
import { InboxSidebar } from '../../../components/App/Inbox/InboxSidebar/InboxSidebar'
import { Background } from '../../../components/Core/Background/Background'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
import { routes } from '../../routes'
import { EmptyInbox } from '../../../components/App/Inbox/Inbox/EmptyInbox'
import { Inbox } from '../../../components/App/Inbox/Inbox/Inbox'

interface Props extends RouteComponentProps {}

export class InboxView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <View>
                <Wrap>
                    <Row alignDefault={true}>
                        <InboxSidebar history={history}/>
                        <Switch>
                            <Route
                                path={routes.app.inbox.index}
                                exact={true}
                                component={EmptyInbox}
                            />
                            <Route
                                path={routes.app.inbox.detail()}
                                component={Inbox}
                            />
                        </Switch>
                    </Row>
                </Wrap>
                <Background />
            </View>
        )
    }
}
