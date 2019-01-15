import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { Form } from '../../Core/DataEntry/Form/Form'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { MultiInput, MultiInputType } from '../../Core/DataEntry/MultiInput/MultiInput'
import { ComposerFieldInput } from './ComposerFieldInput'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import gql from 'graphql-tag'
import { Text } from '../../Core/Text/Text/Text'
import { ArtistSplit } from './ArtistSplit'
import { toast } from 'react-toastify'
import { GetSongQuery, GetSongQueryQueryContent } from '../GraphQL/GetSongByIdQuery'
import { Song } from '../../../types/Song'
import { ArtistRoleDropdown } from './ArtistRoleDropdown'

const UPDATE_SONG_MUTATION = gql`
    mutation addCreatorToSong($songId: Int!, $creator: ArtistShareInputType!) {
        addCreatorToSong(songId: $songId, creator: $creator) {
            success
        }
    }
`

interface MutationResponse {
    addCreatorToSong: {
        _id: number
    }
}

interface MutationVariables {
    sondId: number
    creator: {
        name: string
        share: number
        role: string
    }
}

interface AddCreatorToSongFields {
    newCreator: {
        name: string
        share: number
        role: string
    }
}

interface Props {
    id: number
    onSubmitSuccess?: () => void
}

interface State {
    chartValues: any[]
}

export class AddCreatorForm extends React.Component<Props, State> {
    public state: State = {
        chartValues: [],
    }

    public render() {
        const { id } = this.props

        return (
            <GetSongQuery byId={id}>
                {this.renderWithData}
            </GetSongQuery>
        )
    }

    private renderWithData = ({ data }: GetSongQueryQueryContent) => {
        const { chartValues } = this.state
        const song = data && data.getSong

        if (!song) {
            return (
                <Text isSubtle={true} element={`span`}>
                    No song could be found
                </Text>
            )
        }

        this.setInitialState(song)

        const canShowChart = (chartValues.length > 1 && chartValues[1].share > 0)

        return (
            <Mutation<MutationResponse, MutationVariables> mutation={UPDATE_SONG_MUTATION}>
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
                                    disabled={true}
                                    defaultValue={song.title}
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
                                        defaultValue={song.composer}
                                        disabled={true}
                                    />
                                </MultiInput>
                            </Field>
                            {(song.creators && song.creators.length > 0) && (
                                <Field
                                    title={`Existing creators`}
                                    smallTitle={true}
                                    isLabel={true}
                                    isVertical={true}
                                >
                                    <MultiInput type={MultiInputType.Suffix}>
                                        {song.creators.map(creator => (
                                            <ComposerFieldInput
                                                key={creator._id}
                                                baseName={`creators[${creator._id}]`}
                                                disabled={true}
                                                defaultValue={creator}
                                            />
                                        ))}
                                    </MultiInput>
                                </Field>
                            )}
                            <Field
                                title={`New creator`}
                                smallTitle={true}
                                isLabel={true}
                                isVertical={true}
                            >
                                <MultiInput type={MultiInputType.Suffix}>
                                    <ComposerFieldInput
                                        baseName={`newCreator`}
                                        onNameChange={name => {
                                            if (chartValues) {
                                                chartValues[2] = { name: name }
                                                this.setState({ chartValues })
                                            }
                                        }}
                                        onShareChange={(name, value) => {
                                            chartValues[2] = { name: name, share: value, percentage: value }
                                            this.setState({ chartValues })
                                        }}
                                        disabled={false}
                                    />
                                </MultiInput>
                                <ArtistRoleDropdown name={`newCreator.role`}/>
                            </Field>
                            {canShowChart && (
                                <Field>
                                    <ArtistSplit
                                        values={chartValues}
                                        options={{ width: 150, height: 150 }}
                                    />
                                </Field>
                            )}
                            <Field>
                                <Button
                                    type={`submit`}
                                    buttonStyle={ButtonStyleType.Secondary}
                                    isFullWidth={true}
                                >
                                    Add creator
                                </Button>
                            </Field>
                        </FieldCollection>
                    </Form>
                )}
            </Mutation>
        )
    }

    private setInitialState = (song: Song) => {
        const { chartValues } = this.state

        if (song && chartValues.length === 0) {
            this.setState({
                chartValues: [
                    { index: song.composer._id, percentage: song.composer.share, ...song.composer },
                    ...(song.creators
                            ? song.creators.map(creator => {
                                const data = { index: creator._id, percentage: creator.share, ...creator }

                                delete data.createdAt
                                delete data._id
                                delete data.role

                                return data
                            })
                            : {}
                    ),
                    { index: 2, share: 0, name: '' },
                ],
            })
        }
    }

    private onSubmit = (mutateFunction: MutationFn) => async (fields: AddCreatorToSongFields) => {
        const { onSubmitSuccess, id } = this.props

        try {
            const response = await mutateFunction({
                variables: {
                    songId: id,
                    creator: fields.newCreator,
                },
            })

            if (response && response.data && response.data.addCreatorToSong && onSubmitSuccess) {
                toast.success('Creator added successfully')
                onSubmitSuccess()
            }
        } catch (error) {
            toast.error(error.message)
            throw new Error(error.message)
        }
    }
}
