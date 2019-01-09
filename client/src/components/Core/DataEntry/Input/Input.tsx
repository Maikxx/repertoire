import './Input.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    defaultValue?: string
    disabled?: boolean
    name: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    type: string
}

export class Input extends React.Component<Props> {
    private bem = new BEM('Input')

    public render() {
        const { className, ...restProps } = this.props

        return (
            <input
                className={this.bem.getClassName(className)}
                {...restProps}
            />
        )
    }
}
