import './Field.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Row } from '../../Layout/Row/Row'
import { Column } from '../../Layout/Column/Column'
import { FieldTitle } from '../FieldTitle/FieldTitle'

export interface FieldProps {
    className?: ClassValue
    isInverse?: boolean
    isLabel?: boolean
    isVertical?: boolean
    smallTitle?: boolean
    title?: string
    style?: React.CSSProperties
}

export class Field extends React.Component<FieldProps> {
    private bem = new BEM('Field', () => ({
        'is-inverse': this.props.isInverse,
        'small-title': this.props.smallTitle,
    }))

    public render() {
        const { className, style } = this.props

        return (
            <div
                className={this.bem.getClassName(className)}
                style={style}
            >
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
        const { children, isVertical, title } = this.props

        if (isVertical) {
            return (
                <Column>
                    {title && this.renderTitle()}
                    <div className={this.bem.getElement('content')}>
                        {children}
                    </div>
                </Column>
            )
        }

        return (
            <Row>
                {title && this.renderTitle()}
                <div className={this.bem.getElement('content')}>
                    {children}
                </div>
            </Row>
        )
    }

    private renderTitle = () => {
        const { title } = this.props

        return (
            <FieldTitle>
                {title}
            </FieldTitle>
        )
    }
}
