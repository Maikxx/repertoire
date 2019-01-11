import './MultiInput.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Row } from '../../Layout/Row/Row'

export enum MultiInputType {
    Suffix = 'suffix',
    Double = 'double',
}

interface Props {
    className?: ClassValue
    type: MultiInputType
}

export class MultiInput extends React.Component<Props> {
    private bem = new BEM('MultiInput', () => ({
        [this.props.type]: true,
    }))

    public render() {
        const { children, className } = this.props

        return (
            <Row className={this.bem.getClassName(className)}>
                {children}
            </Row>
        )
    }
}
