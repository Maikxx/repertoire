import './Wrap.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    allSides?: boolean
}

export class Wrap extends React.Component<Props> {
    private bem = new BEM('Wrap', () => ({
        'all-sides': this.props.allSides,
    }))

    public render() {
        const { children, className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
