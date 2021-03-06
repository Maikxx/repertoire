import './Field.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Row } from '../../Layout/Row/Row'
import { Column } from '../../Layout/Column/Column'

interface Props {
    className?: ClassValue
    isLabel?: boolean
    isInverse?: boolean
    isVertical?: boolean
    title: string
}

export class Field extends React.Component<Props> {
    private bem = new BEM('Field', () => ({
        'is-inverse': this.props.isInverse,
    }))

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {this.renderContainer()}
            </div>
        )
    }

    private renderContainer = () => {
        const { isLabel } = this.props

        if (isLabel) {
            return (
                <label className={this.bem.getElement('container')}>
                    {this.renderContent()}
                </label>
            )
        }

        return (
            <div className={this.bem.getElement('container')}>
                {this.renderContent()}
            </div>
        )
    }

    private renderContent = () => {
        const { children, isVertical } = this.props

        if (isVertical) {
            return (
                <Column>
                    {this.renderTitle()}
                    <div className={this.bem.getElement('content')}>
                        {children}
                    </div>
                </Column>
            )
        }

        return (
            <Row>
                {this.renderTitle()}
                <div className={this.bem.getElement('content')}>
                    {children}
                </div>
            </Row>
        )
    }

    private renderTitle = () => {
        const { title } = this.props

        return (
            <span className={this.bem.getElement('title')}>
                {title}
            </span>
        )
    }
}
