import './Inbox.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { Column } from '../../../Core/Layout/Column/Column'
import { Row } from '../../../Core/Layout/Row/Row'
import { Field } from '../../../Core/Field/Field/Field'
import { Button, ButtonStyleType } from '../../../Core/Button/Button'
import { InboxBase } from './InboxBase'
import { RouteComponentProps } from 'react-router-dom'
import { GetSongQuery } from '../../../GraphQL/GetSongByIdQuery'
import { ReadableDate } from '../../../Core/DataDisplay/Date/ReadableDate'

interface Params {
    id: string
}

interface Props extends RouteComponentProps<Params> {}

export class Inbox extends React.Component<Props> {
    private bem = new BEM('Inbox')

    public render() {
        const { id } = this.props.match.params

        return (
            <InboxBase className={this.bem.getClassName()}>
                <GetSongQuery byId={Number(id)}>
                    {({ data }) => {
                        const song = data && data.getSong

                        if (!song) {
                            return null
                        }

                        return (
                            <Column>
                                <Heading level={2}>
                                    Confirm song information
                                </Heading>
                                <Row>
                                    <Field
                                        isInverse={true}
                                        isVertical={true}
                                        title={`Writer / composer`}
                                    >
                                        {song.composer.name}
                                    </Field>
                                    <Field
                                        isInverse={true}
                                        isVertical={true}
                                        title={`Date`}
                                    >
                                        <ReadableDate date={song.createdAt}/>
                                    </Field>
                                </Row>
                                <Row>
                                    <Field
                                        isInverse={true}
                                        isVertical={true}
                                        title={`Song title`}
                                    >
                                        {song.title}
                                    </Field>
                                    <Field
                                        isInverse={true}
                                        title={`Location`}
                                        isVertical={true}
                                    >
                                        {song.country
                                            ? song.country.name
                                            : '-'
                                        }
                                    </Field>
                                </Row>
                                <Field
                                    isVertical={true}
                                    title={`Split`}
                                    isInverse={true}
                                >
                                    50% / 50%
                                </Field>
                                <Field
                                    isVertical={true}
                                    title={`Publishers`}
                                    isInverse={true}
                                >
                                    {song.publishers
                                        ? song.publishers.map(publisher => (
                                            <Row

                                                key={publisher._id}
                                            >
                                                <Field
                                                    isInverse={true}
                                                    isVertical={true}
                                                    title={`Name`}
                                                >
                                                    {publisher.name}
                                                </Field>
                                                <Field
                                                    isInverse={true}
                                                    isVertical={true}
                                                    title={`Role`}
                                                >
                                                    {publisher.role}
                                                </Field>
                                            </Row>
                                        ))
                                        : '-'
                                    }
                                </Field>
                                <Row>
                                    <Field
                                        isVertical={true}
                                        title={`Performance rights organization`}
                                        isInverse={true}
                                    >
                                        {song.performanceRightsOrganization
                                            ? song.performanceRightsOrganization.name
                                            : '-'
                                        }
                                    </Field>
                                </Row>
                                <Row className={this.bem.getElement('action-bar')} justifyEnd={true}>
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
                                        Send feedback
                                    </Button>
                                </Row>
                            </Column>
                        )
                    }}
                </GetSongQuery>
            </InboxBase>
        )
    }
}
