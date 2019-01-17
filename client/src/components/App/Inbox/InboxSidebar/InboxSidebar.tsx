import './InboxSidebar.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Sidebar } from '../../../Chrome/SideBar/SideBar'
import { SidebarList } from '../../../Chrome/SideBar/SideBarList'
import { SidebarListHeader } from '../../../Chrome/Sidebar/SidebarListHeader'
import { InboxItem } from './InboxItem'
import { ArtistItem } from './ArtistItem'
import { ProposedSongsQuery } from '../../../GraphQL/ProposedSongsQuery'
import { History } from 'history'

interface Props {
    className?: ClassValue
    history: History
}

export class InboxSidebar extends React.Component<Props> {
    private bem = new BEM('InboxSidebar')

    public render() {
        const { className, history } = this.props

        return (
            <Sidebar className={this.bem.getClassName(className)}>
                <ProposedSongsQuery variables={{ filters: { filterByIsAccepted: false }}}>
                    {({ data }) => {
                        const songs = data && data.getSongs

                        if (!songs) {
                            return null
                        }

                        const composers = songs
                            .map(song => song.composer.name)
                            .sort()
                        const uniqueComposers = [...new Set(composers)]

                        return (
                            <React.Fragment>
                                <SidebarList>
                                    <SidebarListHeader level={2}>
                                        Inbox
                                    </SidebarListHeader>
                                    {songs.map(song => (
                                        <InboxItem
                                            key={song._id}
                                            song={song}
                                            history={history}
                                        />
                                    ))}
                                </SidebarList>
                                <SidebarList>
                                    <SidebarListHeader level={2}>
                                        Artists
                                    </SidebarListHeader>
                                    {uniqueComposers.map(composer => (
                                        <ArtistItem
                                            key={composer}
                                            composer={composer}
                                        />
                                    ))}
                                </SidebarList>
                            </React.Fragment>
                        )
                    }}
                </ProposedSongsQuery>
            </Sidebar>
        )
    }
}
