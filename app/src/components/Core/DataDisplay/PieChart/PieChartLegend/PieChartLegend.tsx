import './PieChartLegend.scss'
import * as React from 'react'
import { Row } from '../../../Layout/Row/Row'
import { PieChartData } from '../PieChart'
import { PieChartLegendItem } from './PieChartLegendItem'
import * as d3 from 'd3'
import { BEM } from '../../../../../services/BEMService'

export interface PieChartLegendProps {
    values: PieChartData[]
    pie: d3.PieArcDatum<number | { valueOf: () => number}>[]
}

export class PieChartLegend extends React.Component<PieChartLegendProps> {
    private bem = new BEM('PieChartLegend')
    private interpolate = d3.interpolateRgb('#47EADD', '#53AAE9')

    public render() {
        const { values, pie } = this.props

        return (
            <Row className={this.bem.getClassName()}>
                {values.map(({ name, percentage }, index) => (
                    <PieChartLegendItem
                        key={index}
                        options={{ name: name, share: percentage, color: this.interpolate(index / (pie.length - 1)) }}
                    />
                ))}
            </Row>
        )
    }
}
