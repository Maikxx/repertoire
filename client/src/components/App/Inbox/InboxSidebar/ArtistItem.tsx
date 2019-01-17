import './ArtistItem.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { SidebarListItem } from '../../../Chrome/Sidebar/SidebarListItem'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { Row } from '../../../Core/Layout/Row/Row'

interface Props {
    className?: ClassValue
    composer: string
}

export class ArtistItem extends React.Component<Props> {
    private bem = new BEM('ArtistItem')

    public render() {
        const { className, composer } = this.props

        return (
            <SidebarListItem className={this.bem.getClassName(className)}>
                <Card>
                    <Row>
                        <Heading level={3}>
                            {composer}
                        </Heading>
                    </Row>
                </Card>
            </SidebarListItem>
        )
    }
}
