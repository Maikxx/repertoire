import './CenterView.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { View } from '../../Core/Layout/View/View'

interface Props {
    className?: ClassValue
}

export class CenterView extends React.Component<Props> {
    private bem = new BEM('CenterView')

    public render() {
        const { children, className } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                {children}
            </View>
        )
    }
}
