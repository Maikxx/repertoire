import './TextInput.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

export interface TextInputProps {
    className?: ClassValue
    defaultValue?: string
    disabled?: boolean
    max?: number | string
    min?: number | string
    name: string
    onAutoComplete?: (value: string, event: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    required?: boolean
    step?: number
    suffix?: string
    type: string
    typeAhead?: string
}

export class TextInput extends React.Component<TextInputProps> {
    private bem = new BEM('TextInput', () => ({
        'has-suffix': !!this.props.suffix,
    }))
    private inputRef = React.createRef<HTMLInputElement>()
    private typeAheadRef = React.createRef<HTMLSpanElement>()

    public render() {
        const { className, typeAhead, suffix, onAutoComplete, ...restProps } = this.props

        return (
            <div className={this.bem.getElement('wrapper')}>
                <input
                    className={this.bem.getClassName(className)}
                    onKeyDown={this.onKeyDown}
                    ref={this.inputRef}
                    {...restProps}
                />
                {(typeAhead && typeAhead.length > 0) && (
                    <span
                        className={this.bem.getElement('prefill')}
                        ref={this.typeAheadRef}
                    >
                        {typeAhead}
                    </span>
                )}
                {suffix && (
                    <span className={this.bem.getElement('suffix')}>
                        {suffix}
                    </span>
                )}
            </div>
        )
    }

    private onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        const { onAutoComplete, typeAhead } = this.props

        if ((this.inputRef.current && this.typeAheadRef.current) && this.inputRef.current.value === typeAhead) {
            this.typeAheadRef.current.innerText = ''
        }

        if (event.key !== 'ArrowRight') {
            return
        }

        if (this.inputRef.current && typeAhead && this.typeAheadRef.current) {
            this.inputRef.current.value = typeAhead
            this.typeAheadRef.current.innerText = ''

        }

        if (onAutoComplete && this.inputRef.current) {
            onAutoComplete(this.inputRef.current.value, event)
        }
    }
}
