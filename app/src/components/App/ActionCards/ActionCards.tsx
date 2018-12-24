import './ActionCards.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Column } from '../../Core/Layout/Column/Column'
import { Card } from '../../Core/DataDisplay/Card/Card'

interface Props {
    className?: string
}

export class ActionCards extends React.Component<Props> {
    private bem = new BEM('ActionCards')

    public render() {
        const { className } = this.props

        return (
            <Column className={this.bem.getClassName(className)}>
                <Card>
                    Content
                </Card>
                <Card>
                    Content
                </Card>
                <Card>
                    Content
                </Card>
                <Card>
                    Content
                </Card>
            </Column>
        )
    }
}
