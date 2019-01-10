import * as React from 'react'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { getArtistToPreview } from '../../../services/APIService'

interface Props {
    baseName: string
    required?: boolean
}

interface State {
    typeAhead: string
}

export class ComposerFieldInput extends React.Component<Props, State> {
    public state: State = {
        typeAhead: '',
    }

    public render() {
        const { baseName, required } = this.props
        const { typeAhead } = this.state

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
}