import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { View } from '../../../../components/Core/Layout/View/View'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { routes } from '../../../routes'
import { RegisterSongForm } from '../../../../components/App/Dashboard/RegisterSongForm'

interface Props extends RouteComponentProps {}

export class RegisterSongView extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <View>
                <Wrap allSides={true}>
                    <RegisterSongForm
                        onSubmitSuccess={() => history.push(routes.app.dashboard.index)}
                    />
                </Wrap>
            </View>
        )
    }
}
