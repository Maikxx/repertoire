import * as React from 'react'
import { CoverHeader } from '../../components/Cover/CoverHeader/CoverHeader'
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { routes } from '../routes'
import { CoverLoginView } from './CoverLoginView'
import { CoverSignUpView } from './CoverSignUpView'
import { CenterView } from '../../components/Chrome/CenterView/CenterView'

interface Props extends RouteComponentProps {}

export class CoverView extends React.Component<Props> {
    public render() {
        return (
            <CenterView>
                <CoverHeader />
                <Switch>
                    <Route path={routes.cover.login} component={CoverLoginView}/>
                    <Route path={routes.cover.signUp} component={CoverSignUpView}/>
                    <Redirect from={routes.cover.index} exact={true} to={routes.cover.login}/>
                </Switch>
            </CenterView>
        )
    }
}
