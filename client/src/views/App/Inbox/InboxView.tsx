import * as React from 'react'
import { View } from '../../../components/Core/Layout/View/View'
import { Row } from '../../../components/Core/Layout/Row/Row'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'
import { InboxSidebar } from '../../../components/App/Inbox/InboxSidebar/InboxSidebar'
import { Inbox } from '../../../components/App/Inbox/Inbox/Inbox'
import { Background } from '../../../components/Core/Background/Background'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export class InboxView extends React.Component<Props> {
    public render() {
        return (
            <View>
                <Wrap>
                    <Row alignDefault={true}>
                        <InboxSidebar />
                        <Inbox />
                    </Row>
                </Wrap>
                <Background />
            </View>
        )
    }
}
