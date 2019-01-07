import * as React from 'react'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import AddCreatorIcon from '../../../../../public/images/icons/add-creator.svg'
import { History } from 'history'
import { routes } from '../../../../views/routes'

interface Props {
    history: History
}

export class AddMusicCreatorCard extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <Card
                title={`Add Music Creator`}
                description={`On this page you will be able to add a music creator to an existing song that you made`}
                icon={AddCreatorIcon}
                onClick={() => history.push(routes.app.dashboard.addCreator)}
            />
        )
    }
}
