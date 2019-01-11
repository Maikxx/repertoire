import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Form, Fields } from '../../../../components/Core/DataEntry/Form/Form'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { TextInput } from '../../../../components/Core/DataEntry/Input/TextInput'
import { Checkbox } from '../../../../components/Core/DataEntry/Form/Checkbox'
import { Mutation, MutationFn } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, ButtonStyleType } from '../../../../components/Core/Button/Button'
import { routes } from '../../../routes'
import { MultiInput, MultiInputType } from '../../../../components/Core/DataEntry/MultiInput/MultiInput'
import { VariableMultiInputField } from '../../../../components/Core/DataEntry/VariableMultiInput/VariableMultiInputField'
import { FieldTitle } from '../../../../components/Core/Field/FieldTitle/FieldTitle'
import { Text } from '../../../../components/Core/Text/Text/Text'
import { Row } from '../../../../components/Core/Layout/Row/Row'
import { IconType } from '../../../../components/Core/Icon/Icon'
import { ComposerFieldInput } from '../../../../components/App/Dashboard/ComposerFieldInput'
import { ArtistRoleDropdown } from '../../../../components/App/Dashboard/ArtistRoleDropdown'
import { PRODropdown } from '../../../../components/App/Dashboard/PRODropdown'
import { CountryDropdown } from '../../../../components/App/Dashboard/CountryDropdown'
import { PublisherInput } from '../../../../components/App/Dashboard/PublisherInput'

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
        composer: {
            name: string
            share: number
        }
    }
}

interface Props extends RouteComponentProps {}

interface State {
    hasMultpleCreators: boolean
    hasSplitRevenue: boolean
    hasPublishers: boolean
    hasPRO: boolean
}

export class RegisterSongView extends React.Component<Props, State> {
    public state: State = {
        hasMultpleCreators: false,
        hasSplitRevenue: false,
        hasPublishers: true,
        hasPRO: true,
    }

    public render() {
        const { hasMultpleCreators, hasSplitRevenue, hasPublishers, hasPRO } = this.state

        return (
            <View>
                <Wrap allSides={true}>
                    <Mutation<MutationResponse, MutationVariables> mutation={CREATE_SONG_MUTATION}>
                        {mutate => (
                            <Form onSubmit={this.onSubmit(mutate)} method={`post`}>
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
                                        <MultiInput type={MultiInputType.Suffix}>
                                            <ComposerFieldInput
                                                baseName={`composer`}
                                                required={true}
                                            />
                                        </MultiInput>
                                    </Field>
                                    <Field>
                                        <Checkbox
                                            label={`Multiple creators`}
                                            defaultChecked={false}
                                            onChange={() => this.setState({ hasMultpleCreators: !hasMultpleCreators })}
                                        />
                                    </Field>
                                    {hasMultpleCreators && (
                                        <VariableMultiInputField
                                            smallTitle={true}
                                            isVertical={true}
                                            getFieldTitle={onAdd => (
                                                <FieldTitle>
                                                    <Row>
                                                        <Text element={`span`}>
                                                            Fellow composers
                                                        </Text>
                                                        <Button
                                                            type={`button`}
                                                            iconType={IconType.Add}
                                                            buttonStyle={ButtonStyleType.Icon}
                                                            onClick={() => onAdd()}
                                                        />
                                                    </Row>
                                                </FieldTitle>
                                            )}
                                            getNewInput={(index: number) => (
                                                <React.Fragment>
                                                    <MultiInput
                                                        type={MultiInputType.Suffix}
                                                        key={index}
                                                    >
                                                        <ComposerFieldInput baseName={`creators[${index}]`}/>
                                                    </MultiInput>
                                                    <ArtistRoleDropdown name={`creators[${index}].role`} />
                                                </React.Fragment>
                                            )}
                                        />
                                    )}
                                    <Field>
                                        <Checkbox
                                            label={`Split revenue`}
                                            defaultChecked={false}
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
                                            <PublisherInput baseName={`publisher`}/>
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
                                        <Field
                                            title={`PRO`}
                                            smallTitle={true}
                                            isLabel={true}
                                            isVertical={true}
                                        >
                                            <PRODropdown name={`pro`}/>
                                        </Field>
                                    )}
                                    <Field
                                        title={`Location`}
                                        smallTitle={true}
                                        isVertical={true}
                                        isLabel={true}
                                    >
                                        <CountryDropdown
                                            name={`country`}
                                            placeholder={`This song is recorded in`}
                                        />
                                    </Field>
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

    private onSubmit = (mutateFunction: MutationFn) => async (fields: Fields) => {
        const { history } = this.props
        const { title, composer, creators, country, pro, publisher } = fields

        const response = await mutateFunction({
            variables: {
                song: {
                    title,
                    composer,
                    creators,
                    country: Number(country),
                    pro,
                    publisher: {
                        ...publisher,
                        _id: Number(publisher._id),
                    },
                },
            },
        })

        if (response && response.data && response.data.createSong) {
            history.push(routes.app.dashboard.index)
        }
    }
}
