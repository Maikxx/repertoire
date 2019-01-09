import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Form, getFieldsFromSubmitEvent } from '../../../../components/Core/DataEntry/Form/Form'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { TextInput } from '../../../../components/Core/DataEntry/Input/TextInput'
import { Checkbox } from '../../../../components/Core/DataEntry/Form/Checkbox'
import { getArtistToPreview } from '../../../../services/APIService'
// import { CountryDropdown } from '../../../../components/App/Dashboard/CountryDropdown'
import { Mutation, MutationFn } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, ButtonStyleType } from '../../../../components/Core/Button/Button'
import { routes } from '../../../routes'

const CREATE_SONG_MUTATION = gql`
    mutation createSong($song: SongInputType!) {
        createSong(song: $song) {
            _id
        }
    }
`

interface MutationResponse {
    createSong: {
        _id: number
    }
}

interface MutationVariables {
    song: {
        title: string
        composer: string
    }
}

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
                    <Mutation<MutationResponse, MutationVariables> mutation={CREATE_SONG_MUTATION}>
                        {(mutate, { data, loading }) => (
                            <Form onSubmit={this.onSubmit(mutate)}>
                                <FieldCollection>
                                    <Field
                                        title={`Song title`}
                                        smallTitle={true}
                                        isLabel={true}
                                        isVertical={true}
                                    >
                                        <TextInput
                                            name={`title`}
                                            type={`text`}
                                            required={true}
                                            placeholder={`Title of the new song`}
                                        />
                                    </Field>
                                    <Field
                                        title={`Writer / Composer`}
                                        smallTitle={true}
                                        isLabel={true}
                                        isVertical={true}
                                    >
                                        <TextInput
                                            name={`composer`}
                                            type={`text`}
                                            required={true}
                                            onChange={this.onArtistInputChange}
                                            placeholder={`Name of an artist`}
                                            typeAhead={previewArtistName}
                                        />
                                    </Field>
                                    <Field>
                                        <Checkbox
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
                                    {/* <Field
                                        title={`Location`}
                                        smallTitle={true}
                                    >
                                        <CountryDropdown />
                                    </Field> */}
                                    <Field>
                                        <Button
                                            type={`submit`}
                                            buttonStyle={ButtonStyleType.Secondary}
                                            isFullWidth={true}
                                        >
                                            Add song
                                        </Button>
                                    </Field>
                                </FieldCollection>
                            </Form>
                        )}
                    </Mutation>
                </Wrap>
            </View>
        )
    }

    private onSubmit = (mutateFunction: MutationFn) => async (event: React.FormEvent<HTMLFormElement>) => {
        const { history } = this.props

        const fields = getFieldsFromSubmitEvent(event)
        const response = await mutateFunction({
            variables: {
                song: {
                    ...fields,
                },
            },
        })

        if (response && response.data && response.data.createSong) {
            history.push(routes.app.dashboard.index)
        }
    }

    private onArtistInputChange: React.ChangeEventHandler<HTMLInputElement> = async ({ target: { value }}) => {
        try {
            if (!value || !value.length) {
                this.setState({ previewArtistName: '' })
                return
            }

            const artistToPreview = await getArtistToPreview(value)

            if (!artistToPreview || !artistToPreview.name.startsWith(value)) {
                this.setState({ previewArtistName: '' })
                return
            }

            this.setState({ previewArtistName: artistToPreview.name })
        } catch (error) {
            throw new Error(error)
        }
    }
}
