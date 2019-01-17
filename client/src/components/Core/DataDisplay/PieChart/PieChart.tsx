import './PieChart.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import * as d3 from 'd3'
import { PieChartSlice } from './PieChartSlice'
import { PieChartLegend } from './PieChartLegend/PieChartLegend'

export interface PieChartData {
    index: number
    name: string
    percentage: number
}

export interface PieChartOptions {
    width: number
    height: number
}

interface PieChartProps {
    className?: string
    chartName?: string
    options: PieChartOptions
    values: PieChartData[]
}

export class PieChart extends React.Component<PieChartProps> {
    private bem = new BEM('PieChart')

    public render() {
        const { className, chartName, values, options : { width, height }} = this.props

        const data = values
            .map(value => value.percentage)
            .filter(value => value > 0)
        const pie = d3.pie()(data)

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
                <PieChartLegend
                    values={values}
                    pie={pie}
                />
            </React.Fragment>
        )
    }
}
