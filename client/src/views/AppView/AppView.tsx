import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { PageHeader } from '../../components/Chrome/PageHeader/PageHeader'
import { View } from '../../components/Core/Layout/View/View'

interface Props {
    className?: string
}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView')

    public render() {
        const { className } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                <PageHeader />
            </View>
        )
    }
}
