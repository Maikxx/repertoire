import * as React from 'react'
import { PieChart, PieChartData } from '../../Core/DataDisplay/PieChart/PieChart'

interface Props {
    values: PieChartData[]
}

export class ArtistSplit extends React.Component<Props> {
    public render() {
        const { values } = this.props

        return (
            <PieChart
                chartName={`artist-split-chart`}
                values={values}
            />
        )
    }
}
