import './Button.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'

export enum ButtonStyleType {
    Brand = 'brand',
    Secondary = 'secondary',
    Default = 'default',
}

interface Props {
    buttonStyle: ButtonStyleType
    className?: ClassValue
    disabled?: boolean
    isFullWidth?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    isSmall?: boolean
    type: string
}

export class Button extends React.Component<Props> {
    private bem = new BEM('Button', () => ({
        [`is-${this.props.buttonStyle}`]: true,
        'is-disabled': this.props.disabled,
        'is-full-width': this.props.isFullWidth,
        'is-small': this.props.isSmall,
    }))

    public render() {
        const { children, className, buttonStyle, isFullWidth, isSmall, ...restProps } = this.props

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
