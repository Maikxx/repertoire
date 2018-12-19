import './CoverView.scss'
import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { CoverHeader } from '../../components/Cover/CoverHeader/CoverHeader'
import { Route, Switch, Redirect } from 'react-router-dom'
import { routes } from '../routes'
import { CoverLoginView } from './CoverLoginView'
import { CoverSignUpView } from './CoverSignUpView'
import { CoverForgotPasswordView } from './CoverForgotPasswordView'

interface Props {
    className?: string
}

export class CoverView extends React.Component<Props> {
    private bem = new BEM('CoverView')

    public render() {
        const { className } = this.props

        return (
            <section className={this.bem.getClassName(className)}>
                <CoverHeader />
                <Switch>
                    <Route path={routes.cover.login} component={CoverLoginView}/>
                    <Route path={routes.cover.signUp} component={CoverSignUpView}/>
                    <Route path={routes.cover.forgot} component={CoverForgotPasswordView}/>
                    <Redirect from={routes.cover.index} exact={true} to={routes.cover.login}/>
                </Switch>
            </section>
        )
    }
}
