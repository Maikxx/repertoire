import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'

interface Props {
    className?: ClassValue
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export class SidebarListItem extends React.Component<Props> {
    private bem = new BEM('SidebarListItem')

    public render() {
        const { children, className, onClick } = this.props

        return (
            <div
                className={this.bem.getClassName(className)}
                onClick={onClick}
            >
                {children}
            </div>
        )
    }
}
