import './PieChart.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import * as d3 from 'd3'
import { PieChartSlice } from './PieChartSlice'

export interface PieChartData {
    index: number
    name: string
    percentage: number
}

interface PieChartProps {
    className?: string
    chartName?: string
    values: PieChartData[]
}

export class PieChart extends React.Component<PieChartProps> {
    private bem = new BEM('PieChart')

    public render() {
        const { className, chartName, values } = this.props
        console.log(values)

        const width = 250
        const height = 250

        const pie = d3.pie()(values.map(value => value.percentage))

        return (
            <React.Fragment>
                <svg
                    className={this.bem.getClassName(className)}
                    id={chartName}
                    height={height}
                    width={width}
                >
                    <g transform={`translate(${width / 2}, ${height / 2})`}>
                        <PieChartSlice
                            pie={pie}
                            options={{
                                width,
                                height,
                            }}
                        />
                    </g>
                </svg>
            </React.Fragment>
        )
    }
}
