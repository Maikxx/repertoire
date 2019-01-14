import * as React from 'react'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { getArtistToPreview } from '../../../services/APIService'

interface Props {
    baseName: string
    required?: boolean
    onChange: (nameValue: string, shareValue: number) => void
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
                    onChange={this.onChange}
                    max={100}
                    placeholder={`Share`}
                    suffix={`%`}
                />
            </React.Fragment>
        )
    }

    private onArtistInputChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target: { value }}) => {
        try {
            if (!value || !value.length) {
                this.setState({ typeAhead: '' })
                return
            }

            this.setState({ nameValue: value })

            const artistToPreview = await getArtistToPreview(value)

            if (!artistToPreview || !artistToPreview.name.startsWith(value)) {
                this.setState({ typeAhead: '' })
                return
            }

            this.setState({ typeAhead: artistToPreview.name })
        } catch (error) {
            throw new Error(error)
        }
    }

    private onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target: { value: shareValue }}) => {
        const { onChange } = this.props
        const { nameValue } = this.state

        onChange(nameValue, Number(shareValue))
    }
}
