import './InboxItem.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Card } from '../../Core/DataDisplay/Card/Card'
import { SidebarListItem } from '../../Chrome/Sidebar/SidebarListItem'

interface Props {
    className?: string
}

export class InboxItem extends React.Component<Props> {
    private bem = new BEM('InboxItem')

    public render() {
        const { className } = this.props

        return (
            <SidebarListItem className={this.bem.getClassName(className)}>
                <Card>
                    Hoi
                </Card>
            </SidebarListItem>
        )
    }
}
