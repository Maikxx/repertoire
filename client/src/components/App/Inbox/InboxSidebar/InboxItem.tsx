import './InboxItem.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { SidebarListItem } from '../../../Chrome/Sidebar/SidebarListItem'
import { Row } from '../../../Core/Layout/Row/Row'
import { Icon } from '../../../Core/Icon/Icon'
import { Column } from '../../../Core/Layout/Column/Column'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { Text } from '../../../Core/Text/Text/Text'
import { Song } from '../../../../types/Song'
import { ReadableDate } from '../../../Core/DataDisplay/Date/ReadableDate'

interface Props {
    className?: ClassValue
    song: Song
}

export class InboxItem extends React.Component<Props> {
    private bem = new BEM('InboxItem')

    public render() {
        const { className, song } = this.props

        return (
            <SidebarListItem className={this.bem.getClassName(className)}>
                <Card>
                    <Row>
                        <Icon />
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
