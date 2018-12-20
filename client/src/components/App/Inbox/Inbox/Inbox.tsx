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
                <Card className={this.bem.getElement('card')}>
                    <Column>
                        <Heading
                            className={this.bem.getElement('heading')}
                            level={2}
                        >
                            Confirm song information
                        </Heading>
                        <Row className={this.bem.getElement('field-row')}>
                            <Field
                                isInverse={true}
                                isVertical={true}
                                title={`Writer / composer`}
                            >
                                Name of the artist(s)
                            </Field>
                            <Field
                                isInverse={true}
                                isVertical={true}
                                title={`Date`}
                            >
                                Date of recording
                            </Field>
                        </Row>
                        <Row className={this.bem.getElement('field-row')}>
                            <Field
                                isInverse={true}
                                isVertical={true}
                                title={`Song title`}
                            >
                                Name of the song
                            </Field>
                            <Field
                                isInverse={true}
                                title={`Location`}
                                isVertical={true}
                            >
                                Loction where the song is created
                            </Field>
                        </Row>
                        <FieldGroup
                            className={this.bem.getElement('field-group')}
                            isVertical={true}
                            title={`Split`}
                        >
                            50% / 50%
                        </FieldGroup>
                        <FieldGroup
                            className={this.bem.getElement('field-group')}
                            isVertical={true}
                            title={`Publishers`}
                        >
                            <Row className={this.bem.getElement('field-row')}>
                                <Field
                                    isInverse={true}
                                    isVertical={true}
                                    title={`Names`}
                                >
                                    A state to check if the names of publishers can be shown
                                </Field>
                                <Field
                                    isInverse={true}
                                    isVertical={true}
                                    title={`Role`}
                                >
                                    Role of the publisher
                                </Field>
                            </Row>
                        </FieldGroup>
                        <FieldGroup
                            className={this.bem.getElement('field-group')}
                            isVertical={true}
                            title={`PRO`}
                        >
                            <Field
                                isInverse={true}
                                isVertical={true}
                                title={`Names`}
                            >
                                Names of the PROs
                            </Field>
                        </FieldGroup>
                        <Row
                            className={this.bem.getElement('action-bar')}
                            justifyEnd={true}
                        >
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
