import './FieldTitle.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Text } from '../../Text/Text/Text'

interface Props {
    className?: ClassValue
}

export class FieldTitle extends React.Component<Props> {
    private bem = new BEM('FieldTitle')

    public render() {
        const { children, className } = this.props

        return (
            <Text
                className={this.bem.getClassName(className)}
                element={`span`}
            >
                {children}
            </Text>
        )
    }
}
