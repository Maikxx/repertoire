import './PieChartLegendItem.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../../services/BEMService'
import { Row } from '../../../Layout/Row/Row'
import { Text } from '../../../Text/Text/Text'

interface PieChartLegendItemOptions {
    color: string
    name: string
    share: number
}

interface Props {
    className?: ClassValue
    options: PieChartLegendItemOptions
}

export class PieChartLegendItem extends React.Component<Props> {
    private bem = new BEM('PieChartLegendItem')

    public render() {
        const { className, options: { color, name, share }} = this.props

        return (
            <Row className={this.bem.getClassName(className)}>
                <i
                    className={this.bem.getElement('color')}
                    style={{
                        backgroundColor: color,
                    }}
                />
                <Text
                    className={this.bem.getElement('name')}
                    element={`span`}
                >
                    {name}
                </Text>
                <Text
                    className={this.bem.getElement('share')}
                    element={`span`}
                    isSubtle={true}
                >
                    {share}%
                </Text>
            </Row>
        )
    }
}
