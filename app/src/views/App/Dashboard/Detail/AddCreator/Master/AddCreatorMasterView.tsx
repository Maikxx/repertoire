import * as React from 'react'
import { SongsList } from '../../../../../../components/App/Dashboard/SongsList'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export class AddCreatorMasterView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <SongsList history={history}/>
        )
    }
}
