import './TextInput.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    defaultValue?: string
    disabled?: boolean
    name: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    type: string
}

export class TextInput extends React.Component<Props> {
    private bem = new BEM('TextInput')

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
