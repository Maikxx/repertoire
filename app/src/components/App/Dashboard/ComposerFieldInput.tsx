import * as React from 'react'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { getArtistToPreview } from '../../../services/APIService'
import { toast } from 'react-toastify'

interface Props {
    baseName: string
    required?: boolean
    onShareChange: (nameValue: string, shareValue: number) => void
    onNameChange?: (nameValue: string) => void
}

interface State {
    typeAhead: string
    nameValue: string
}

export class ComposerFieldInput extends React.Component<Props, State> {
    public state: State = {
        typeAhead: '',
        nameValue: '',
    }

    public render() {
        const { baseName, required } = this.props
        const { nameValue, typeAhead } = this.state

        return (
            <React.Fragment>
                <TextInput
                    name={`${baseName}.name`}
                    type={`text`}
                    required={required}
                    onChange={this.onArtistInputChange}
                    onAutoComplete={this.onAutoComplete}
                    placeholder={`Name of an artist`}
                    typeAhead={typeAhead}
                />
                <TextInput
                    type={`number`}
                    name={`${baseName}.share`}
                    required={required}
                    step={0.1}
                    min={0}
                    disabled={!nameValue}
                    onChange={this.onShareChange}
                    max={100}
                    placeholder={`Share`}
                    suffix={`%`}
                />
            </React.Fragment>
        )
    }

    private onAutoComplete = (value: string, event: React.KeyboardEvent<HTMLInputElement>) => {
        const { onNameChange } = this.props

        if (onNameChange) {
            onNameChange(value)
        }
    }

    private onArtistInputChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target: { value }}) => {
        const { onNameChange } = this.props

        try {
            if (!value || !value.length) {
                this.setState({ typeAhead: '' })
                return
            }

            this.setState({ nameValue: value }, () => {
                if (onNameChange) {
                    onNameChange(value)
                }
            })

            const artistToPreview = await getArtistToPreview(value)

            if (!artistToPreview || !artistToPreview.name.startsWith(value)) {
                this.setState({ typeAhead: '' })
                return
            }

            this.setState({ typeAhead: artistToPreview.name })
        } catch (error) {
            toast.error(error.message)
            throw new Error(error)
        }
    }

    private onShareChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value: shareValue }}) => {
        const { onShareChange } = this.props
        const { nameValue } = this.state

        onShareChange(nameValue, Number(shareValue))
    }
}
