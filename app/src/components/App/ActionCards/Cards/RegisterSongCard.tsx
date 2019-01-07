import * as React from 'react'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { History } from 'history'
import { routes } from '../../../../views/routes'
import { IconType } from '../../../Core/Icon/Icon'

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
                iconType={IconType.RegisterSong}
                onClick={() => history.push(routes.app.dashboard.register)}
            />
        )
    }
}
