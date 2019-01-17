import * as React from 'react'
import { Column } from '../../../Core/Layout/Column/Column'
import { InboxBase } from './InboxBase'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export class EmptyInbox extends React.Component<Props> {
    public render() {
        return (
            <InboxBase>
                <Column>
                    <Heading level={2}>
                        Please, select a song from the left first!
                    </Heading>
                </Column>
            </InboxBase>
        )
    }
}
