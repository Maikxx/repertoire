import './Row.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    style?: React.CSSProperties
}

export class Row extends React.PureComponent<Props> {
    private bem = new BEM('Row')

    public render() {
        const { children, className, ...restProps } = this.props

        return (
            <div
                className={this.bem.getClassName(className)}
                {...restProps}
            >
                {children}
            </div>
        )
    }
}
