import './Text.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    element: string
    isSubtle?: boolean
}

export class Text extends React.Component<Props> {
    private bem = new BEM('Text', () => ({
        'is-subtle': this.props.isSubtle,
    }))

    public render() {
        const { children, className, element: Element } = this.props

        return (
            <Element className={this.bem.getClassName(className)}>
                {children}
            </Element>
        )
    }
}
