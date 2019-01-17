import './InboxBase.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Card } from '../../../Core/DataDisplay/Card/Card'

interface Props {
    className?: string
}

export class InboxBase extends React.Component<Props> {
    private bem = new BEM('InboxBase')

    public render() {
        const { children, className } = this.props

        return (
            <section className={this.bem.getClassName(className)}>
                <Card className={this.bem.getElement('card')}>
                    {children}
                </Card>
            </section>
        )
    }
}
