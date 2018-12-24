import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { View } from '../../components/Core/Layout/View/View'
import { RouteComponentProps } from 'react-router-dom'
import { PageHeader } from '../../components/Chrome/PageHeader/PageHeader'
import { Background } from '../../components/Core/Background/Background'
import { ActionCards } from '../../components/App/ActionCards/ActionCards'

interface Props extends RouteComponentProps {
    className?: string
}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView')

    public render() {
        const { className, history } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                <Background />
                <PageHeader history={history} />
                <ActionCards />
            </View>
        )
    }
}
