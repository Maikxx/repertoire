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
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { View } from '../../components/Core/Layout/View/View'

const SIGN_UP_USER_MUTATION = gql`
    mutation createUser($user: UserInputType!) {
        createUser(user: $user) {
            _id
        }
    }
`

interface SignUpMutationVariables {
    user: {
        email: string
        password: string
        isAdmin?: boolean
    }
}

interface SignUpMutationResponse {
    token: string
}

interface Props extends RouteComponentProps {}

interface State {
    email?: string
    password?: string
    confirmPassword?: string
    redirectToReferrer?: boolean
    canSubmitForm?: boolean
}

export class CoverSignUpView extends React.Component<Props, State> {
    public state: State = {
        email: '',
        password: '',
        confirmPassword: '',
        redirectToReferrer: false,
        canSubmitForm: false,
    }

    public render() {
        const { redirectToReferrer, canSubmitForm } = this.state

        if (redirectToReferrer) {
            const { history, location } = this.props
            const { from } = location.state || { from: { pathname: '/' }}

            history.push(from)
        }

        return (
            <View>
                <Mutation<SignUpMutationResponse, SignUpMutationVariables> mutation={SIGN_UP_USER_MUTATION}>
                    {mutate => (
                        <Form
                            renderFormTitle={this.renderFormTitle}
                            onSubmit={this.onSubmit(mutate)}
                        >
                            <FieldCollection>
                                <FieldGroup>
                                    <Field
                                        isLabel={true}
                                        isVertical={true}
                                        title={`E-mail`}
                                    >
                                        <Input
                                            name={`email`}
                                            onChange={this.onChangeInput}
                                            type={`email`}
                                        />
                                    </Field>
                                    <Field
                                        isLabel={true}
                                        isVertical={true}
                                        title={`Password`}
                                    >
                                        <Input
                                            name={`password`}
                                            onChange={this.onChangeInput}
                                            type={`password`}
                                        />
                                    </Field>
                                    <Field
                                        isLabel={true}
                                        isVertical={true}
                                        title={`Confirm password`}
                                    >
                                        <Input
                                            name={`confirmPassword`}
                                            onChange={this.onChangeInput}
                                            type={`password`}
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
                    )}
                </Mutation>
            </View>
        )
    }

    private renderFormTitle = (): JSX.Element => {
        return (
            <Text element={`legend`}>
                Sign up
            </Text>
        )
    }

    private checkIfUserCanSubmitForm = (): boolean => {
        const { email, password, confirmPassword } = this.state

        return (!!email && !!password && (!!confirmPassword && password === confirmPassword))
    }

    private onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
        const { target: { value, name }} = event

        this.setState({
            [name]: value,
        }, () => {
            this.setState({ canSubmitForm: this.checkIfUserCanSubmitForm() })
        })
    }

    private onSubmit = (userSignUp: MutationFn) => (event: React.FormEvent<HTMLFormElement>): void => {
        const { email, password } = this.state

        if (!email || !password) {
            throw new Error('All input fields need to be filled out')
        }

        userSignUp({ variables: { user: { email, password, isAdmin: true }}})
    }
}
