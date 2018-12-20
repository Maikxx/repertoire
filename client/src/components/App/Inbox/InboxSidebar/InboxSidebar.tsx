import './InboxSidebar.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Sidebar } from '../../../Chrome/SideBar/SideBar'
import { SidebarList } from '../../../Chrome/SideBar/SideBarList'
import { SidebarListHeader } from '../../../Chrome/Sidebar/SidebarListHeader'
import { InboxItem } from './InboxItem'
import { ArtistItem } from './ArtistItem'

interface Props {
    className?: string
}

export class InboxSidebar extends React.Component<Props> {
    private bem = new BEM('InboxSidebar')

    public render() {
        const { className } = this.props

        return (
            <Sidebar className={this.bem.getClassName(className)}>
                <SidebarList>
                    <SidebarListHeader level={2}>
                        Inbox
                    </SidebarListHeader>
                    <InboxItem />
                </SidebarList>
                <SidebarList>
                    <SidebarListHeader level={2}>
                        Artists
                    </SidebarListHeader>
                    <ArtistItem />
                </SidebarList>
            </Sidebar>
        )
    }
}
