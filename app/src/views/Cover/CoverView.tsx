import * as React from 'react'
import { CoverHeader } from '../../components/Cover/CoverHeader/CoverHeader'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { routes } from '../routes'
import { CoverLoginView } from './CoverLoginView'
import { CoverSignUpView } from './CoverSignUpView'
import { CoverForgotPasswordView } from './CoverForgotPasswordView'
import { CenterView } from '../../components/Chrome/CenterView/CenterView'
import { BEM } from '../../services/BEMService'

interface Props extends RouteComponentProps {}

export class CoverView extends React.Component<Props> {
    private bem = new BEM('CoverView')

    public render() {
        return (
            <CenterView className={this.bem.getClassName()}>
                <CoverHeader />
                <Switch>
                    <Route path={routes.cover.login} component={CoverLoginView}/>
                    <Route path={routes.cover.signUp} component={CoverSignUpView}/>
                    <Route path={routes.cover.forgot} component={CoverForgotPasswordView}/>
                    <Redirect from={routes.cover.index} exact={true} to={routes.cover.login}/>
                </Switch>
            </CenterView>
        )
    }
}
