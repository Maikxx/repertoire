import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { routes } from '../../../../../routes'
import { AddPublisherForm } from '../../../../../../components/App/Dashboard/AddPublisherForm'

interface Params {
    id: string
}

interface Props extends RouteComponentProps<Params> {}

export class AddPublisherDetailView extends React.Component<Props> {
    public render() {
        const { history } = this.props
        const { id } = this.props.match.params

        return (
            <AddPublisherForm
                id={Number(id)}
                onSubmitSuccess={() => history.push(routes.app.dashboard.index)}
            />
        )
    }
}
