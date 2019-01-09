import './Row.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    alignDefault?: boolean
    className?: ClassValue
    justifyEnd?: boolean
}

export class Row extends React.PureComponent<Props> {
    private bem = new BEM('Row', () => ({
        'should-align-default': this.props.alignDefault,
        'should-justify-end': this.props.justifyEnd,
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
