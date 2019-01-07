import * as React from 'react'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import MusicNoteIcon from '../../../../../public/images/icons/music.svg'
import { History } from 'history'
import { routes } from '../../../../views/routes'

interface Props {
    history: History
}

export class RegisterSongCard extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <Card
                title={`Register Song`}
                description={`Here you can add a new song to the Repertoire system`}
                icon={MusicNoteIcon}
                onClick={() => history.push(routes.app.dashboard.register)}
            />
        )
    }
}
