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
import gql from 'graphql-tag'
import { Mutation, MutationFn } from 'react-apollo'
import { setAuthToken } from '../../services/LocalStorageService'

const LOGIN_MUTATION = gql`
    mutation userLogin($auth: AuthInputType!) {
        userLogin(auth: $auth) {
            token
        }
    }
`

interface LoginMutationVariables {
    auth: {
        email?: string
        password?: string
    }
}

interface LoginMutationResponse {
    token: string
}

interface Props extends RouteComponentProps {
    className?: string
}

interface State {
    email?: string
    password?: string
    redirectToReferrer?: boolean
    canSubmitForm?: boolean
}

export class CoverLoginView extends React.Component<Props, State> {
    public state: State = {
        email: '',
        password: '',
        redirectToReferrer: false,
        canSubmitForm: false,
    }

    private bem = new BEM('CoverLoginView')

    public render() {
        const { className } = this.props
        const { redirectToReferrer, canSubmitForm } = this.state

        if (redirectToReferrer) {
            const { history, location } = this.props
            const { from } = location.state || { from: { pathname: '/' }}

            history.push(from)
        }

        return (
            <div className={this.bem.getClassName(className)}>
                <Mutation<LoginMutationResponse, LoginMutationVariables> mutation={LOGIN_MUTATION}>
                    {(mutate, { loading, data, error }) => (
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
                                </FieldGroup>
                            </FieldCollection>
                            <Button
                                buttonStyle={ButtonStyleType.Brand}
                                disabled={!canSubmitForm}
                                isFullWidth={true}
                                type={`submit`}
                            >
                                Login
                            </Button>
                            <TextLink to={routes.cover.forgot}>
                                Forgot password?
                            </TextLink>
                            <TextLink to={routes.cover.signUp}>
                                Create an account?
                            </TextLink>
                        </Form>
                    )}
                </Mutation>
            </div>
        )
    }

    private renderFormTitle = () => {
        return (
            <Text Element={`legend`}>
                Sign in
            </Text>
        )
    }

    private onChangeInput: React.ChangeEventHandler<HTMLInputElement> = event => {
        const { target: { value, name }} = event

        this.setState({
            [name]: value,
        }, () => {
            this.setState({ canSubmitForm: !!this.state.email && !!this.state.password })
        })
    }

    private onSubmit = (userLogin: MutationFn) => async (event: React.FormEvent<HTMLFormElement>) => {
        const { email, password } = this.state

        if (!email || !password) {
            throw new Error('All input fields need to be filled out')
        }

        const response = await userLogin({ variables: { auth: { email, password }}})
        const data = response && response.data && response.data.userLogin
        const token = data && data.token

        if (token) {
            setAuthToken(token)
            this.setState({ redirectToReferrer: true })
        }
    }
}
