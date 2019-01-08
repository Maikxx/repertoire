import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Form } from '../../../../components/Core/DataEntry/Form/Form'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { TextInput } from '../../../../components/Core/DataEntry/Input/TextInput'

interface Props extends RouteComponentProps {}

export class RegisterSongView extends React.Component<Props> {
    public render() {
        return (
            <View>
                <Wrap allSides={true}>
                    <Form>
                        <FieldCollection>
                            <Field
                                title={`Writer/Composer`}
                                smallTitle={true}
                                isLabel={true}
                                isVertical={true}
                            >
                                <TextInput
                                    name={`writer`}
                                    type={`text`}
                                    placeholder={`Name of an artist`}
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
}
