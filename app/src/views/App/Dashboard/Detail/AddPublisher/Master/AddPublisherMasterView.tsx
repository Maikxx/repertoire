import * as React from 'react'
import { SongsList } from '../../../../../../components/App/Dashboard/SongsList'
import { RouteComponentProps } from 'react-router-dom'
import { routes } from '../../../../../routes'

interface Props extends RouteComponentProps {}

export class AddPublisherMasterView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <SongsList
                history={history}
                routeBase={routes.app.dashboard.addPublisher}
            />
        )
    }
}
