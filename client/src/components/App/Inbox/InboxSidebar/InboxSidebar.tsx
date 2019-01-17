import './InboxSidebar.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Sidebar } from '../../../Chrome/SideBar/SideBar'
import { SidebarList } from '../../../Chrome/SideBar/SideBarList'
import { SidebarListHeader } from '../../../Chrome/Sidebar/SidebarListHeader'
import { InboxItem } from './InboxItem'
import { ArtistItem } from './ArtistItem'
import { ProposedSongsQuery } from '../../../GraphQL/ProposedSongsQuery'

interface Props {
    className?: ClassValue
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
                    <ProposedSongsQuery variables={{ filters: { filterByIsAccepted: false }}}>
                        {({ data }) => {
                            const songs = data && data.getSongs

                            if (!songs) {
                                return null
                            }

                            return songs.map(song => (
                                <InboxItem
                                    key={song._id}
                                    song={song}
                                />
                            ))
                        }}
                    </ProposedSongsQuery>
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
