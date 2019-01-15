import * as React from 'react'
import { PieChart, PieChartData, PieChartOptions } from '../../Core/DataDisplay/PieChart/PieChart'

interface Props {
    values: PieChartData[]
    options: PieChartOptions
}

export class ArtistSplit extends React.Component<Props> {
    public render() {
        const { values, options } = this.props

        return (
            <PieChart
                chartName={`artist-split-chart`}
                values={values}
                options={options}
            />
        )
    }
}
