import './Checkbox.scss'
import * as React from 'react'
import { ClassValue, BEM } from '../../../../services/BEMService'
import { Icon, IconType } from '../../Icon/Icon'

interface Props {
    className?: ClassValue
    defaultChecked?: boolean
    disabled?: boolean
    label?: string | JSX.Element
    name: string
    onChange?: (checked: boolean, name: string) => void
}

interface State {
    isChecked: boolean
}

export class Checkbox extends React.PureComponent<Props, State> {
    public state: State = {
        isChecked: !!this.props.defaultChecked,
    }

    private bem = new BEM('Checkbox', () => ({
        'is-checked': this.state.isChecked,
        'is-disabled': this.props.disabled,
    }))

    public render() {
        const { label, className, name, disabled } = this.props
        const { isChecked } = this.state

        return (
            <label className={this.bem.getClassName(className)}>
                <input
                    onChange={this.handleOnChange}
                    type="checkbox"
                    name={name}
                    id={`input-${name}`}
                    checked={isChecked}
                    className={this.bem.getElement('input')}
                    disabled={disabled}
                />
                <div className={this.bem.getElement('checkbox')}>
                    <Icon
                        type={IconType.Check}
                        className={this.bem.getElement('mark')}
                    />
                </div>
                <div className={this.bem.getElement('label')}>
                    {label}
                </div>
            </label>
        )
    }

    private handleOnChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        this.setState({ isChecked: event.target.checked }, () => {
            const { onChange, name } = this.props
            const { isChecked } = this.state

            if (onChange) {
                onChange(isChecked, name)
            }
        })
    }
}
