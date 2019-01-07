import * as React from 'react'
import { View } from '../../../../components/Core/Layout/View/View'
import { ActionCards } from '../../../../components/App/ActionCards/ActionCards'
import { RouteComponentProps } from 'react-router'
import { Background } from '../../../../components/Core/Background/Background'

interface Props extends RouteComponentProps {}

export class DashboardMasterView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <View>
                <Background />
                <ActionCards history={history} />
            </View>
        )
    }
}
