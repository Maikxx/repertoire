import * as React from 'react'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import AddPublisherIcon from '../../../../../public/images/icons/add-publisher.svg'
import { History } from 'history'
import { routes } from '../../../../views/routes'

interface Props {
    history: History
}

export class AddPublisherCard extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <Card
                title={`Add Publisher/PRO`}
                description={`On this page you will be able to add a publisher and or PRO to an existing song that you made`}
                icon={AddPublisherIcon}
                onClick={() => history.push(routes.app.dashboard.addPublisher)}
            />
        )
    }
}
