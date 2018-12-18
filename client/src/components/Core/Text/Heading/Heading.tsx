import './Heading.scss'
import * as React from 'react'
import { BEM } from '../../../../../src/services/BEMService'

interface Props {
    className?: string
    level: number
}

export class Heading extends React.Component<Props> {
    private bem = new BEM('Heading', () => ({
        [`level-${this.props.level}`]: true,
    }))

    public render() {
        const { className, level, children } = this.props

        const Component = `h${level}`

        return (
            <Component className={this.bem.getClassName(className)}>
                {children}
            </Component>
        )
    }
}
