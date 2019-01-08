import './FieldCollectionFooter.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
}

export class FieldCollectionFooter extends React.Component<Props> {
    private bem = new BEM('FieldCollectionFooter')

    public render() {
        const { className, children } = this.props

        return (
            <footer className={this.bem.getClassName(className)}>
                {children}
            </footer>
        )
    }
}
