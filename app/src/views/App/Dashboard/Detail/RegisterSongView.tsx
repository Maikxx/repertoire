import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Form } from '../../../../components/Core/DataEntry/Form/Form'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { TextInput } from '../../../../components/Core/DataEntry/Input/TextInput'
require('dotenv').load()

interface Props extends RouteComponentProps {}

interface State {
    previewArtistName?: string
}

export class RegisterSongView extends React.Component<Props, State> {
    public state: State = {
        previewArtistName: '',
    }

    public render() {
        const { previewArtistName } = this.state

        return (
            <View>
                <Wrap allSides={true}>
                    <Form>
                        <FieldCollection>
                            <Field
                                title={`Writer / Composer`}
                                smallTitle={true}
                                isLabel={true}
                                isVertical={true}
                            >
                                <TextInput
                                    name={`writer`}
                                    type={`text`}
                                    onChange={this.onArtistInputChange}
                                    placeholder={`Name of an artist`}
                                    prefill={previewArtistName}
                                />
                            </Field>
                            <Field
                                title={`Song title`}
                                smallTitle={true}
                                isLabel={true}
                                isVertical={true}
                            >
                                <TextInput
                                    name={`songTitle`}
                                    type={`text`}
                                    placeholder={`Title of the new song`}
                                />
                            </Field>
                        </FieldCollection>
                    </Form>
                </Wrap>
            </View>
        )
    }

    private onArtistInputChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target: { value }}) => {
        try {
            if (!value || !value.length) {
                this.setState({ previewArtistName: '' })
                return
            }

            const lastFmUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${value}&api_key=${process.env.LAST_FM_KEY}&format=json`
            const response = await fetch(lastFmUrl)
            const { results: { artistmatches: { artist: artists }}} = await response.json()
            const [artistToPreview] = artists

            if (!artistToPreview) {
                return
            }

            const { name } = artistToPreview

            this.setState({ previewArtistName: name })
        } catch (error) {
            throw new Error(error)
        }
    }
}
