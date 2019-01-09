import './SidebarList.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { Column } from '../../Core/Layout/Column/Column'

interface Props {
    className?: ClassValue
}

export class SidebarList extends React.Component<Props> {
    private bem = new BEM('SidebarList')

    public render() {
        const { children, className } = this.props

        return (
            <Column className={this.bem.getClassName(className)}>
                {children}
            </Column>
        )
    }
}
