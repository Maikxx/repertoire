import * as React from 'react'
import { Select, SelectChangeHandler, SelectOption } from '../../Core/DataEntry/Form/Select'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'

interface Props {
    name: string
    placeholder?: string
}

interface State {
    isAlternativeDateSelected: boolean
}

export class RecordedOnInput extends React.Component<Props, State> {
    public state: State = {
        isAlternativeDateSelected: false,
    }

    private options = [
        {
            label: 'Autofill',
            value: 'auto',
        },
        {
            label: 'Custom date',
            value: 'custom',
        },
    ]

    public render() {
        const { ...restProps } = this.props
        const { isAlternativeDateSelected } = this.state

        return (
            <React.Fragment>
                <Select
                    options={this.options}
                    onChange={this.onSelectionChange}
                    {...restProps}
                    defaultValue={this.options[0]}
                />
                {isAlternativeDateSelected && (
                    <TextInput
                        name={`createdAt`}
                        type={`date`}
                        placeholder={`Alternative date`}
                        max={this.getMaxCreatedAtDate()}
                    />
                )}
            </React.Fragment>
        )
    }

    private onSelectionChange: SelectChangeHandler = (selectedOption: SelectOption) => {
        if (selectedOption) {
            this.setState({ isAlternativeDateSelected: selectedOption.value !== 'auto' })
        }
    }

    private getMaxCreatedAtDate = () => {
        const today = new Date() as Date
        let dd = today.getDate() as string | number
        let mm = today.getMonth() + 1 as string | number
        const yyyy = today.getFullYear()

        if (dd < 10) {
            dd = `0${dd}`
        }
        if (mm < 10) {
            mm = `0${mm}`
        }

        return `${yyyy}-${mm}-${dd}`
    }
}
