import * as React from 'react'
import { FieldCollection } from '../../components/Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../components/Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../components/Core/Field/Field/Field'
import { Form } from '../../components/Core/DataEntry/Form/Form'
import { Text } from '../../components/Core/Text/Text/Text'
import { Input } from '../../components/Core/DataEntry/Input/Input'
import { Button, ButtonStyleType } from '../../components/Core/Button/Button'
import { TextLink } from '../../components/Core/Text/TextLink/TextLink'
import { routes } from '../routes'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../components/Core/Layout/View/View'

interface Props extends RouteComponentProps {}

interface State {
    email?: string
    canSubmitForm?: boolean
}

export class CoverForgotPasswordView extends React.Component<Props, State> {
    public state: State = {
        email: '',
        canSubmitForm: false,
    }

    public render() {
        const { canSubmitForm } = this.state

        return (
            <View>
                <Form renderFormTitle={this.renderFormTitle}>
                    <FieldCollection>
                        <FieldGroup>
                            <Field
                                isLabel={true}
                                isVertical={true}
                                title={`Email`}
                            >
                                <Input
                                    name={`email`}
                                    onChange={this.onChangeInput}
                                    type={`email`}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldCollection>
                    <Button
                        buttonStyle={ButtonStyleType.Brand}
                        disabled={!canSubmitForm}
                        isFullWidth={true}
                        type={`submit`}
                    >
                        Sign up
                    </Button>
                    <TextLink to={routes.cover.login}>
                        Have an account? Log in here
                    </TextLink>
                </Form>
            </View>
        )
    }

    private renderFormTitle = (): JSX.Element => {
        return (
            <Text element={`legend`}>
                Reset password
            </Text>
        )
    }

    private checkIfUserCanSubmitForm = (): boolean => {
        const { email } = this.state

        return !!email
    }

    private onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
        const { target: { value, name }} = event

        this.setState({
            [name]: value,
        }, () => {
            this.setState({ canSubmitForm: this.checkIfUserCanSubmitForm() })
        })
    }
}