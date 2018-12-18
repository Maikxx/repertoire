import * as React from 'react'
import { BEM } from '../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView')

    public render() {
        return (
            <main className={this.bem.getClassName()}>
                Repertoire for artists
            </main>
        )
    }
}
