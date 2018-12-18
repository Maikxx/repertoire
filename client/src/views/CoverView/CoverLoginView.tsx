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
    redirectToReferrer: boolean
}

export class CoverLoginView extends React.Component<Props, State> {
    public state: State = {
        redirectToReferrer: false,
    }

    private bem = new BEM('CoverLoginView')

    public render() {
        const { className } = this.props
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            const { history, location } = this.props
            const { from } = location.state || { from: { pathname: '/' }}

            history.push(from)
        }

        return (
            <div className={this.bem.getClassName(className)}>
                <Form renderFormTitle={this.renderFormTitle}>
                    <FieldCollection>
                        <FieldGroup>
                            <Field
                                isLabel={true}
                                isVertical={true}
                                title={`E-mail`}
                            >
                                <Input
                                    name={`email`}
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
                                    type={`password`}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldCollection>
                    <Button
                        buttonStyle={ButtonStyleType.Brand}
                        isFullWidth={true}
                        type={`submit`}
                    >
                        Login
                    </Button>
                    <TextLink to={routes.cover.forgot}>
                        Forgot password?
                    </TextLink>
                </Form>
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
}
