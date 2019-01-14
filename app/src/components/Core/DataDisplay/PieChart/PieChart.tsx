import './PieChart.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import * as d3 from 'd3'

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

interface PieSliceOptions {
    height: number
    width: number
}

interface PieSliceProps {
    pie: d3.PieArcDatum<number | { valueOf: () => number} >[]
    options: PieSliceOptions
}

export class PieSlice extends React.Component<PieSliceProps> {
    private interpolate = d3.interpolateRgb('#47EADD', '#53AAE9')

    public render() {
        const { pie, options: { width, height }} = this.props

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2)

        return pie.map((slice: any, index: number) => {
            const sliceColor = this.interpolate(index / (pie.length - 1))
            const arcSlice = arc(slice) as string | undefined

            return (
                <path
                    key={index}
                    d={arcSlice}
                    fill={sliceColor}
                />
            )
        })
    }
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
            <svg
                className={this.bem.getClassName(className)}
                id={chartName}
                height={height}
                width={width}
            >
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    <PieSlice
                        pie={pie}
                        options={{
                            width,
                            height,
                        }}
                    />
                </g>
            </svg>
        )
    }
}
