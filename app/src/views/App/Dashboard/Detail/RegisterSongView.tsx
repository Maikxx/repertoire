import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Form } from '../../../../components/Core/DataEntry/Form/Form'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { TextInput } from '../../../../components/Core/DataEntry/Input/TextInput'
import { Checkbox } from '../../../../components/Core/DataEntry/Form/Checkbox'
import { getArtistToPreview } from '../../../../services/APIService'

interface Props extends RouteComponentProps {}

interface State {
    previewArtistName?: string
    hasMultpleCreators: boolean
    hasSplitRevenue: boolean
    hasPublishers: boolean
    hasPRO: boolean
}

export class RegisterSongView extends React.Component<Props, State> {
    public state: State = {
        previewArtistName: '',
        hasMultpleCreators: true,
        hasSplitRevenue: true,
        hasPublishers: true,
        hasPRO: true,
    }

    public render() {
        const { previewArtistName, hasMultpleCreators, hasSplitRevenue, hasPublishers, hasPRO } = this.state

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
                            <Field>
                                <Checkbox
                                    name={`hasMultipleCreators`}
                                    label={`Multiple creators`}
                                    defaultChecked={true}
                                    onChange={() => this.setState({ hasMultpleCreators: !hasMultpleCreators })}
                                />
                            </Field>
                            {hasMultpleCreators && (
                                <Field>
                                    TODO
                                </Field>
                            )}
                            <Field>
                                <Checkbox
                                    name={`hasSplitRevenue`}
                                    label={`Split revenue`}
                                    defaultChecked={true}
                                    onChange={() => this.setState({ hasSplitRevenue: !hasSplitRevenue })}
                                />
                            </Field>
                            {hasSplitRevenue && (
                                <Field>
                                    TODO
                                </Field>
                            )}
                            <Field>
                                <Checkbox
                                    name={`hasPublishers`}
                                    label={`Publishers`}
                                    defaultChecked={true}
                                    onChange={() => this.setState({ hasPublishers: !hasPublishers })}
                                />
                            </Field>
                            {hasPublishers && (
                                <Field>
                                    TODO
                                </Field>
                            )}
                            <Field>
                                <Checkbox
                                    name={`hasPRO`}
                                    label={`PRO`}
                                    defaultChecked={true}
                                    onChange={() => this.setState({ hasPRO: !hasPRO })}
                                />
                            </Field>
                            {hasPRO && (
                                <Field>
                                    TODO
                                </Field>
                            )}
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

            const artistToPreview = await getArtistToPreview(value)

            if (!artistToPreview) {
                return
            }

            this.setState({ previewArtistName: artistToPreview.name })
        } catch (error) {
            throw new Error(error)
        }
    }
}
