import './Button.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'

export enum ButtonStyleType {
    Brand = 'brand',
}

interface Props {
    className?: string
    type: string
    buttonStyle: ButtonStyleType
    isFullWidth?: boolean
}

export class Button extends React.Component<Props> {
    private bem = new BEM('Button', () => ({
        [`is-${this.props.buttonStyle}`]: true,
        'is-full-width': this.props.isFullWidth,
    }))

    public render() {
        const { children, className, buttonStyle, isFullWidth, ...restProps } = this.props

        return (
            <button
                className={this.bem.getClassName(className)}
                {...restProps}
            >
                <div className={this.bem.getElement('content')}>
                    {children}
                </div>
            </button>
        )
    }
}
