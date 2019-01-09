import './Sidebar.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'

interface Props {
    className?: ClassValue
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
