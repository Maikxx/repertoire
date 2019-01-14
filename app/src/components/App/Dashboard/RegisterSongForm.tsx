import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { Form, Fields } from '../../Core/DataEntry/Form/Form'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { MultiInput, MultiInputType } from '../../Core/DataEntry/MultiInput/MultiInput'
import { ComposerFieldInput } from './ComposerFieldInput'
import { Checkbox } from '../../Core/DataEntry/Form/Checkbox'
import { VariableMultiInputField } from '../../Core/DataEntry/VariableMultiInput/VariableMultiInputField'
import { FieldTitle } from '../../Core/Field/FieldTitle/FieldTitle'
import { Row } from '../../Core/Layout/Row/Row'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { IconType } from '../../Core/Icon/Icon'
import { ArtistRoleDropdown } from './ArtistRoleDropdown'
import { PublisherInput } from './PublisherInput'
import { PRODropdown } from './PRODropdown'
import { DateOfRecordingInput } from './DateOfRecordingInput'
import { CountryDropdown } from './CountryDropdown'
import gql from 'graphql-tag'
import { Text } from '../../Core/Text/Text/Text'
import { ArtistSplit } from './ArtistSplit'
import { PieChartData } from '../../Core/DataDisplay/PieChart/PieChart'

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

interface Props {
    onSubmitSuccess?: () => void
}

interface State {
    hasMultpleCreators: boolean
    hasPublishers: boolean
    hasPRO: boolean
    chartValues: PieChartData[]
}

export class RegisterSongForm extends React.Component<Props> {
    public state: State = {
        hasMultpleCreators: true,
        hasPublishers: true,
        hasPRO: true,
        chartValues: [],
    }

    public componentDidMount() {
        this.createNewDataEntry(0)
        this.createNewDataEntry(1)
    }

    public render() {
        const { hasMultpleCreators, hasPublishers, hasPRO, chartValues } = this.state
        const canShowChart = chartValues.length > 1 && chartValues[1].percentage > 0

        return (
            <Mutation<MutationResponse, MutationVariables> mutation={CREATE_SONG_MUTATION}>
                {mutate => (
                    <Form
                        onSubmit={this.onSubmit(mutate)}
                        method={`post`}
                    >
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
                                        onNameChange={name => this.onChangeComposerFieldInputName(0, name)}
                                        onShareChange={(name, share) => this.onChangeComposerFieldInputShare(0, name, share)}
                                    />
                                </MultiInput>
                            </Field>
                            <Field>
                                <Checkbox
                                    label={`Multiple creators`}
                                    defaultChecked={true}
                                    onChange={() => this.setState({ hasMultpleCreators: !hasMultpleCreators })}
                                />
                            </Field>
                            {hasMultpleCreators && (
                                <VariableMultiInputField
                                    smallTitle={true}
                                    isVertical={true}
                                    onAdd={this.createNewDataEntry}
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
                                                <ComposerFieldInput
                                                    baseName={`creators[${index}]`}
                                                    onNameChange={name => this.onChangeComposerFieldInputName(index + 1, name)}
                                                    onShareChange={(name, share) => this.onChangeComposerFieldInputShare(index + 1, name, share)}
                                                />
                                            </MultiInput>
                                            <ArtistRoleDropdown name={`creators[${index}].role`} />
                                        </React.Fragment>
                                    )}
                                />
                            )}
                            {canShowChart && (
                                <Field>
                                    <ArtistSplit values={chartValues}/>
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
                                title={`Date of recording`}
                                smallTitle={true}
                                isVertical={true}
                                isLabel={true}
                            >
                                <DateOfRecordingInput
                                    name={`recordedOn`}
                                    placeholder={`Select a date option`}
                                />
                            </Field>
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
                                    Register song
                                </Button>
                            </Field>
                        </FieldCollection>
                    </Form>
                )}
            </Mutation>
        )
    }

    private onSubmit = (mutateFunction: MutationFn) => async (fields: Fields) => {
        const { onSubmitSuccess } = this.props
        const { title, composer, creators, country, pro, publisher, createdAt } = fields

        const response = await mutateFunction({
            variables: {
                song: {
                    title,
                    composer,
                    creators,
                    country: Number(country),
                    pro,
                    createdAt: createdAt || null,
                    publisher: {
                        ...publisher,
                        _id: Number(publisher._id),
                    },
                },
            },
        })

        if (response && response.data && response.data.createSong && onSubmitSuccess) {
            onSubmitSuccess()
        }
    }

    private createNewDataEntry = (index: number) => {
        const { chartValues } = this.state
        const newChartValues = chartValues

        const newEntry = {
            index,
            name: '',
            percentage: 0,
        }

        newChartValues.push(newEntry)

        this.setState({ chartValues: newChartValues })
    }

    private updateChartValues = (index: number, name: string, share?: number) => {
        const { chartValues } = this.state

        if (chartValues.length === 0) {
            return
        }

        const indexOfItemToUpdate = chartValues.findIndex(chartValue => (chartValue && chartValue.index) === index)

        if (indexOfItemToUpdate === -1) {
            return
        }

        const itemToUpdate = chartValues[indexOfItemToUpdate]
        itemToUpdate.name = name

        if (typeof share === 'number') {
            itemToUpdate.percentage = share
        }

        this.setState({ chartValues })
    }

    private onChangeComposerFieldInputShare = (index: number, name: string, share: number) => {
        this.updateChartValues(index, name, share)
    }

    private onChangeComposerFieldInputName = (index: number, name: string) => {
        this.updateChartValues(index, name)
    }
}
