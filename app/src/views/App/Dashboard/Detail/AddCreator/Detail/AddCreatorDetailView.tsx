import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AddCreatorForm } from '../../../../../../components/App/Dashboard/AddCreatorForm'
import { routes } from '../../../../../routes'

interface Params {
    id: string
}

interface Props extends RouteComponentProps<Params> {}

export class AddCreatorDetailView extends React.Component<Props> {
    public render() {
        const { history } = this.props
        const { id } = this.props.match.params

        return (
            <AddCreatorForm
                id={Number(id)}
                onSubmitSuccess={() => history.push(routes.app.dashboard.index)}
            />
        )
    }
}
