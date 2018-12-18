import './CoverView.scss'
import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { CoverHeader } from '../../components/Cover/CoverHeader/CoverHeader'
import { Route } from 'react-router-dom'
import { routes } from '../routes'
import { CoverLoginView } from './CoverLoginView'

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
                <Route path={routes.cover.index} exact={true} component={CoverLoginView}/>
            </section>
        )
    }
}