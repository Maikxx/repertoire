import './Background.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'

interface Props {
    className?: string
}

export class Background extends React.Component<Props> {
    private bem = new BEM('Background')

    public render() {
        const { className } = this.props

        return (
            <i className={this.bem.getClassName(className)}/>
        )
    }
}
