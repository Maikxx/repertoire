import './Inbox.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { Column } from '../../../Core/Layout/Column/Column'
import { Row } from '../../../Core/Layout/Row/Row'
import { Field } from '../../../Core/Field/Field/Field'
import { FieldGroup } from '../../../Core/Field/FieldGroup/FieldGroup'
import { Button, ButtonStyleType } from '../../../Core/Button/Button'

interface Props {
    className?: string
}

export class Inbox extends React.Component<Props> {
    private bem = new BEM('Inbox')

    public render() {
        const { className } = this.props

        return (
            <section className={this.bem.getClassName(className)}>
                <Card>
                    <Column>
                        <Heading level={2}>
                            Confirm song information
                        </Heading>
                        <Row>
                            <Field title={`Writer / composer`} isVertical={true}>
                                Name of the artist(s)
                            </Field>
                            <Field title={`Date`} isVertical={true}>
                                Date of recording
                            </Field>
                        </Row>
                        <Row>
                            <Field title={`Song title`} isVertical={true}>
                                Name of the song
                            </Field>
                            <Field title={`Location`} isVertical={true}>
                                Loction where the song is created
                            </Field>
                        </Row>
                        <FieldGroup title={`Split`}>
                            50% / 50%
                        </FieldGroup>
                        <FieldGroup title={`Publishers`}>
                            <Field title={`Names`}>
                                A state to check if the names of publishers can be shown
                            </Field>
                            <Field title={`Role`}>
                                Role of the publisher
                            </Field>
                        </FieldGroup>
                        <FieldGroup title={`PRO`}>
                            <Field title={`Names`}>
                                Names of the PROs
                            </Field>
                        </FieldGroup>
                        <Row>
                            <Button
                                buttonStyle={ButtonStyleType.Secondary}
                                isSmall={true}
                                type={`button`}
                            >
                                Confirm
                            </Button>
                            <Button
                                buttonStyle={ButtonStyleType.Default}
                                isSmall={true}
                                type={`button`}
                            >
                                Information
                            </Button>
                        </Row>
                    </Column>
                </Card>
            </section>
        )
    }
}
