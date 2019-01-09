import './TextInput.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    defaultValue?: string
    disabled?: boolean
    name: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    typeAhead?: string
    required?: boolean
    type: string
}

export class TextInput extends React.Component<Props> {
    private bem = new BEM('TextInput')
    private inputRef = React.createRef<HTMLInputElement>()
    private typeAheadRef = React.createRef<HTMLSpanElement>()

    public render() {
        const { className, typeAhead, ...restProps } = this.props

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
            </div>
        )
    }

    private onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        const { typeAhead } = this.props

        if (event.key !== 'ArrowRight') {
            return
        }

        if (this.inputRef.current && typeAhead && this.typeAheadRef.current) {
            this.inputRef.current.value = typeAhead
            this.typeAheadRef.current.innerText = ''
        }
    }
}
