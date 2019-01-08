import * as React from 'react'
import { Column } from '../../Core/Layout/Column/Column'
import { RegisterSongCard } from './Cards/RegisterSongCard'
import { History } from 'history'
import { AddMusicCreatorCard } from './Cards/AddMusicCreatorCard'
import { AddPublisherCard } from './Cards/AddPublisherCard'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'

interface Props {
    history: History
}

export class ActionCards extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <Wrap allSides={true}>
                <Column>
                    <RegisterSongCard history={history} />
                    <AddMusicCreatorCard history={history} />
                    <AddPublisherCard history={history} />
                </Column>
            </Wrap>
        )
    }
}
