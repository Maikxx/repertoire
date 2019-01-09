import './SidebarListItem.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'

interface Props {
    className?: ClassValue
}

export class SidebarListItem extends React.Component<Props> {
    private bem = new BEM('SidebarListItem')

    public render() {
        const { children, className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
