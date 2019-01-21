import * as React from 'react'
import { View } from '../../../components/Core/Layout/View/View'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'
import { UserFields } from '../../../components/App/User/UserFields'
import { BEM } from '../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export class UserView extends React.Component<Props> {
    private bem = new BEM('UserView')

    public render() {
        const { history } = this.props

        return (
            <View className={this.bem.getClassName()}>
                <Wrap allSides={true}>
                    <UserFields history={history} />
                </Wrap>
            </View>
        )
    }
}
