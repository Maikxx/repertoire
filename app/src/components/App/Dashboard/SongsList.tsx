import * as React from 'react'
import { GetSongsQuery, GetSongsQueryQueryContent } from '../GraphQL/GetSongsQuery'
import { Column } from '../../Core/Layout/Column/Column'
import { Card } from '../../Core/DataDisplay/Card/Card'
import { History } from 'history'
import { routes } from '../../../views/routes'
import { IconType } from '../../Core/Icon/Icon'

interface Props {
    history: History
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
        const { history } = this.props

        return (
            <Column>
                {data && data.getSongs && data.getSongs.map(song => (
                    <Card
                        key={song._id}
                        title={song.title}
                        iconType={IconType.RegisterSong}
                        onClick={() => history.push(routes.app.dashboard.addCreator.detail(song._id))}
                    />
                ))}
            </Column>
        )
    }
}
