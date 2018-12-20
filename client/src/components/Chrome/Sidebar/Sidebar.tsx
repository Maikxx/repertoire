import './Sidebar.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'

interface Props {
    className?: string
}

export class Sidebar extends React.Component<Props> {
    private bem = new BEM('Sidebar')

    public render() {
        const { children, className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
