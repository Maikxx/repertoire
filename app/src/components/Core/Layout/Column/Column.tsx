import './Column.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class Column extends React.PureComponent<Props> {
    private bem = new BEM('Column')

    public render() {
        const { children, className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
