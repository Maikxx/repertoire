import './ActionCards.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Column } from '../../Core/Layout/Column/Column'
import { RegisterSongCard } from './Cards/RegisterSongCard'
import { History } from 'history'
import { AddMusicCreatorCard } from './Cards/AddMusicCreatorCard'
import { AddPublisherCard } from './Cards/AddPublisherCard'

interface Props {
    className?: string
    history: History
}

export class ActionCards extends React.Component<Props> {
    private bem = new BEM('ActionCards')

    public render() {
        const { className, history } = this.props

        return (
            <Column className={this.bem.getClassName(className)}>
                <RegisterSongCard history={history} />
                <AddMusicCreatorCard history={history} />
                <AddPublisherCard history={history} />
            </Column>
        )
    }
}
