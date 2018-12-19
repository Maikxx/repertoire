import * as React from 'react'
import { BEM } from '../../services/BEMService'
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

interface Props extends RouteComponentProps {
    className?: string
}

interface State {
    email?: string
    canSubmitForm?: boolean
}

export class CoverForgotPasswordView extends React.Component<Props, State> {
    public state: State = {
        email: '',
        canSubmitForm: false,
    }

    private bem = new BEM('CoverForgotPasswordView')

    public render() {
        const { className } = this.props
        const { canSubmitForm } = this.state

        return (
            <div className={this.bem.getClassName(className)}>
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
            </div>
        )
    }

    private renderFormTitle = () => {
        return (
            <Text Element={`legend`}>
                Reset password
            </Text>
        )
    }

    private checkIfUserCanSubmitForm = (): boolean => {
        const { email } = this.state

        return !!email
    }

    private onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event): null | void => {
        const { target: { value, name }} = event

        this.setState({
            [name]: value,
        }, () => {
            this.setState({ canSubmitForm: this.checkIfUserCanSubmitForm() })
        })
    }
}
