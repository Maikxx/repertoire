import * as React from 'react'
import { GetSongsQuery, GetSongsQueryQueryContent } from '../GraphQL/GetSongsQuery'
import { Column } from '../../Core/Layout/Column/Column'
import { Card } from '../../Core/DataDisplay/Card/Card'
import { History } from 'history'
import { IconType } from '../../Core/Icon/Icon'
import { Text } from '../../Core/Text/Text/Text'

interface Props {
    history: History
    routeBase: any
}

export class SongsList extends React.Component<Props> {
    public render() {
        return (
            <GetSongsQuery>
                {this.renderWithData}
            </GetSongsQuery>
        )
    }

    private renderWithData = ({ data }: GetSongsQueryQueryContent) => {
        const { history, routeBase } = this.props

        return (
            <Column>
                {(!data || !data.getSongs.length) && (
                    <Text isSubtle={true} element={`span`}>
                        No songs found
                    </Text>
                )}
                {data && data.getSongs && data.getSongs.map(song => (
                    <Card
                        key={song._id}
                        title={song.title}
                        iconType={IconType.RegisterSong}
                        onClick={() => history.push(routeBase.detail(song._id))}
                    />
                ))}
            </Column>
        )
    }
}
