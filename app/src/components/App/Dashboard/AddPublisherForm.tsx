import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { Form } from '../../Core/DataEntry/Form/Form'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { TextInput } from '../../Core/DataEntry/Input/TextInput'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import gql from 'graphql-tag'
import { Text } from '../../Core/Text/Text/Text'
import { toast } from 'react-toastify'
import { GetSongQuery, GetSongQueryQueryContent } from '../GraphQL/GetSongByIdQuery'
import { PublisherInput, publisherInputRoleOptions } from './PublisherInput'
import { PerformanceRightsOrganizationDropdown } from './PerformanceRightsOrganizationDropdown'
import { GenericMutationResponse } from '../../../types/GraphQL'

const UPDATE_SONG_MUTATION = gql`
    mutation addPublisherToSong($songId: Int!, $publisher: SongPublisherInputType!, $performanceRightsOrganization: Int) {
        addPublisherToSong(songId: $songId, publisher: $publisher, performanceRightsOrganization: $performanceRightsOrganization) {
            success
        }
    }
`

interface MutationResponse {
    addPublisherToSong: GenericMutationResponse
}

interface MutationVariables {
    sondId: number
    publisher: {
        _id: number
        role: string
    }
}

interface AddPublisherFormFields {
    publisher: {
        _id: string
        role: string
    }
    performanceRightsOrganization: {
        _id: number
    }
}

interface Props {
    id: number
    onSubmitSuccess?: () => void
}

export class AddPublisherForm extends React.Component<Props> {
    public render() {
        const { id } = this.props

        return (
            <GetSongQuery byId={id}>
                {this.renderWithData}
            </GetSongQuery>
        )
    }

    private renderWithData = ({ data }: GetSongQueryQueryContent) => {
        const song = data && data.getSong

        if (!song) {
            return (
                <Text isSubtle={true} element={`span`}>
                    No song could be found
                </Text>
            )
        }

        const { title, publishers, performanceRightsOrganization } = song

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
                                    defaultValue={title}
                                />
                            </Field>
                            {(publishers && publishers.length > 0) && (
                                <Field
                                    title={`Existing publishers`}
                                    smallTitle={true}
                                    isLabel={true}
                                    isVertical={true}
                                >
                                    {publishers.map(publisher => {
                                        const { _id, name, role } = publisher
                                        const roleLabel = publisherInputRoleOptions.find(option => option.value === role)

                                        return (
                                            <PublisherInput
                                                baseName={`existingPublisher`}
                                                key={_id}
                                                defaultValue={{
                                                    name: { value: _id, label: name },
                                                    role: { value: role, label: roleLabel ? roleLabel.label : '' },
                                                }}
                                                disabled={true}
                                            />
                                        )
                                    })}
                                </Field>
                            )}
                            <Field
                                title={`New publisher`}
                                smallTitle={true}
                                isLabel={true}
                                isVertical={true}
                            >
                                <PublisherInput baseName={`publisher`}/>
                            </Field>
                            {!performanceRightsOrganization && (
                                <Field
                                    title={`Performance rights organization`}
                                    smallTitle={true}
                                    isLabel={true}
                                    isVertical={true}
                                >
                                    <PerformanceRightsOrganizationDropdown
                                        name={`performanceRightsOrganization`}
                                    />
                                </Field>
                            )}
                            <Field>
                                <Button
                                    type={`submit`}
                                    buttonStyle={ButtonStyleType.Secondary}
                                    isFullWidth={true}
                                >
                                    Add publisher and / or PRO
                                </Button>
                            </Field>
                        </FieldCollection>
                    </Form>
                )}
            </Mutation>
        )
    }

    private onSubmit = (mutateFunction: MutationFn) => async (fields: AddPublisherFormFields) => {
        const { onSubmitSuccess, id } = this.props
        const { publisher, performanceRightsOrganization } = fields

        try {
            const response = await mutateFunction({
                variables: {
                    songId: id,
                    publisher: { ...publisher, _id: Number(publisher._id) },
                    performanceRightsOrganization: Number(performanceRightsOrganization),
                },
            })

            if (response && response.data && response.data.addPublisherToSong && onSubmitSuccess) {
                toast.success('Publisher and / or performance rights organization added successfully')
                onSubmitSuccess()
            }
        } catch (error) {
            toast.error(error.message)
            throw new Error(error.message)
        }
    }
}
