import './SidebarListHeader.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { Heading } from '../../Core/Text/Heading/Heading'

interface Props {
    className?: ClassValue
    level: number
}

export class SidebarListHeader extends React.Component<Props> {
    private bem = new BEM('SidebarListHeader')

    public render() {
        const { children, className, level } = this.props

        return (
            <Heading
                className={this.bem.getClassName(className)}
                level={level}
            >
                {children}
            </Heading>
        )
    }
}
