import './Text.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    Element: string
}

export class Text extends React.Component<Props> {
    private bem = new BEM('Text')

    public render() {
        const { children, className, Element } = this.props

        return (
            <Element className={this.bem.getClassName(className)}>
                {children}
            </Element>
        )
    }
}
