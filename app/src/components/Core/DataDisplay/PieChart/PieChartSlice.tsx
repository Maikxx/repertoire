import * as React from 'react'
import * as d3 from 'd3'

interface PieChartSliceOptions {
    height: number
    width: number
}

interface PieChartSliceProps {
    pie: d3.PieArcDatum<number | { valueOf: () => number} >[]
    options: PieChartSliceOptions
}

export class PieChartSlice extends React.Component<PieChartSliceProps> {
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
