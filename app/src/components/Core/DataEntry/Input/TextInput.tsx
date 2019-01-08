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
    prefill?: string
    type: string
}

export class TextInput extends React.Component<Props> {
    private bem = new BEM('TextInput')

    public render() {
        const { className, prefill, ...restProps } = this.props

        return (
            <div className={this.bem.getElement('wrapper')}>
                <input
                    className={this.bem.getClassName(className)}
                    {...restProps}
                />
                {(prefill && prefill.length > 0) && (
                    <span className={this.bem.getElement('prefill')}>
                        {prefill}
                    </span>
                )}
            </div>
        )
    }
}
