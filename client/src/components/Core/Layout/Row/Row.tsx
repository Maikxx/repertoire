import './Row.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    alignDefault?: boolean
}

export class Row extends React.PureComponent<Props> {
    private bem = new BEM('Row', () => ({
        'should-align-default': this.props.alignDefault,
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
