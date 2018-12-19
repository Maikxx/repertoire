import * as React from 'react'
import { BEM } from '../../services/BEMService'

interface Props {
    className?: string
}

export class AppView extends React.Component<Props> {
    private bem = new BEM('AppView')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                App
            </div>
        )
    }
}
