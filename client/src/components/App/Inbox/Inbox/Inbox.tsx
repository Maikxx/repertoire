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
import { PieChart } from '../../../Core/DataDisplay/PieChart/PieChart'

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

                        const canShowDistribution = (song.creators && song.creators.length > 0)
                        const distribution = [
                            {
                                index: song.composer._id,
                                name: song.composer.name,
                                percentage: song.composer.share,
                            },
                            ...(song.creators
                                ? song.creators.map(({ _id, name, share }) => ({
                                    index: _id,
                                    name,
                                    percentage: share,
                                }))
                                : {}
                            ),
                        ]

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
                                    isInverse={true}
                                    isVertical={true}
                                    title={`Other creators`}
                                >
                                    {song.creators
                                        ? song.creators.map(creator => (
                                            <Row key={creator._id}>
                                                <Field title={`Name`}>
                                                    {creator.name}
                                                </Field>
                                                <Field title={`Role`}>
                                                    {creator.role}
                                                </Field>
                                            </Row>
                                        ))
                                        : '-'
                                    }
                                </Field>
                                <Field
                                    isVertical={true}
                                    title={`Attribution distribution`}
                                    isInverse={true}
                                >
                                    {canShowDistribution
                                        ? (
                                            <PieChart
                                                options={{ width: 250, height: 250 }}
                                                values={distribution}
                                            />
                                        ) : '-'
                                    }
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
