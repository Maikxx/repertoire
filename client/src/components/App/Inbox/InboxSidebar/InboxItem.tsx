import './InboxItem.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { SidebarListItem } from '../../../Chrome/Sidebar/SidebarListItem'
import { Row } from '../../../Core/Layout/Row/Row'
import { Column } from '../../../Core/Layout/Column/Column'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { Text } from '../../../Core/Text/Text/Text'
import { Song } from '../../../../types/Song'
import { ReadableDate } from '../../../Core/DataDisplay/Date/ReadableDate'
import { routes } from '../../../../views/routes'
import { History } from 'history'

interface Props {
    className?: ClassValue
    song: Song
    history: History
}

export class InboxItem extends React.Component<Props> {
    private bem = new BEM('InboxItem')

    public render() {
        const { className, song, history } = this.props

        return (
            <SidebarListItem
                className={this.bem.getClassName(className)}
                onClick={() => history.push(routes.app.inbox.detail(song._id))}
            >
                <Card>
                    <Row>
                        <Column>
                            <Heading level={3}>
                                {song.composer.name}
                            </Heading>
                            <Text element={'span'}>
                                {song.title}
                            </Text>
                            <Text element={'span'} isSubtle={true}>
                                <ReadableDate date={song.createdAt} />
                            </Text>
                        </Column>
                    </Row>
                </Card>
            </SidebarListItem>
        )
    }
}
