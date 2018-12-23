import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { View } from '../../components/Core/Layout/View/View'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {
    className?: string
}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView')

    public render() {
        const { className } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                Content
            </View>
        )
    }
}
