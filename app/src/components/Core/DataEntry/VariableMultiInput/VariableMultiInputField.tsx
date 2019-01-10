import './VariableMultiInputField.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import times from 'lodash-es/times'
import { Button, ButtonStyleType } from '../../Button/Button'
import c from 'classnames'
import { Field } from '../../Field/Field/Field'
import { IconType } from '../../Icon/Icon'

interface Props {
    addButtonLabel?: string
    baseAmount?: number
    className?: ClassValue
    defaultAmount?: number
    isDisabled?: boolean
    limit?: number
    amountOfPrefilledInputs?: number
    onAdd?: (event: React.SyntheticEvent<HTMLButtonElement>) => void
    onRemove?: (event: React.SyntheticEvent<HTMLButtonElement>, index: number) => void
    getNewInput: (iteration: number) => React.ReactNode
    getFieldTitle: (onAdd: () => void) => React.ReactNode
}

interface State {
    amountOfInputs: number
}

export class VariableMultiInputField extends React.Component<Props, State> {
    public state: State = {
        amountOfInputs: this.props.defaultAmount || 1,
    }

    private bem = new BEM('VariableMultiInputField')

    public render() {
        const { className, getFieldTitle } = this.props

        return (
            <Field className={this.bem.getClassName(className)}>
                {getFieldTitle(this.onAdd)}
                {this.renderInputs()}
            </Field>
        )
    }

    private onAdd = () => {
        const { amountOfInputs } = this.state

        this.setState({ amountOfInputs: amountOfInputs + 1 })
    }

    private onRemoveButtonClick = (index: number, event: React.SyntheticEvent<HTMLButtonElement>) => {
        const { onRemove } = this.props
        const { amountOfInputs } = this.state

        this.setState({ amountOfInputs: amountOfInputs - 1 })

        if (onRemove) {
            onRemove(event, index)
        }
    }

    private renderInputs = () => {
        const { getNewInput, amountOfPrefilledInputs } = this.props
        const { amountOfInputs } = this.state

        return times(amountOfInputs, n => {
            const hasButton = (!!(n > 0 && n + 1 === amountOfInputs)) || n === amountOfInputs - (amountOfPrefilledInputs || 0)

            return (
                <div
                    key={n}
                    className={c('rpa-VariableMultiInputField__item', { 'rpa-VariableMultiInputField__item--has-button': hasButton })}
                >
                    <div className={'rpa-VariableMultiInputField__item__content'}>
                        {getNewInput(n)}
                    </div>
                    {hasButton && (
                        <Button
                            className={'rpa-VariableMultiInputField__item__remove'}
                            type={`button`}
                            iconType={IconType.Trash}
                            buttonStyle={ButtonStyleType.Icon}
                            onClick={e => this.onRemoveButtonClick(n, e)}
                        />
                    )}
                </div>
            )
        })
    }
}
