import './Loader.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
}

export class Loader extends React.Component<Props> {
    private bem = new BEM('Loader')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <div className={this.bem.getElement('track')}/>
            </div>
        )
    }
}
