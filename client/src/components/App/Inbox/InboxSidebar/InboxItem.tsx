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

interface Props {
    className?: ClassValue
}

export class InboxItem extends React.Component<Props> {
    private bem = new BEM('InboxItem')

    public render() {
        const { className } = this.props

        return (
            <SidebarListItem className={this.bem.getClassName(className)}>
                <Card>
                    <Row>
                        <Icon />
                        <Column>
                            <Heading level={3}>
                                Naam
                            </Heading>
                            <Text element={'span'}>
                                Titel
                            </Text>
                            <Text element={'span'} isSubtle={true}>
                                {new Date().toString()}
                            </Text>
                        </Column>
                    </Row>
                </Card>
            </SidebarListItem>
        )
    }
}
