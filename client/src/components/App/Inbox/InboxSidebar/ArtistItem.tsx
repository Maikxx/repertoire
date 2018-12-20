import './ArtistItem.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Heading } from '../../../Core/Text/Heading/Heading'
import { SidebarListItem } from '../../../Chrome/Sidebar/SidebarListItem'
import { Card } from '../../../Core/DataDisplay/Card/Card'
import { Row } from '../../../Core/Layout/Row/Row'
import { Icon } from '../../../Core/Icon/Icon'

interface Props {
    className?: string
}

export class ArtistItem extends React.Component<Props> {
    private bem = new BEM('ArtistItem')

    public render() {
        const { className } = this.props

        return (
            <SidebarListItem className={this.bem.getClassName(className)}>
                <Card>
                    <Row>
                        <Icon
                            isRound={true}
                            isSmall={true}
                        />
                        <Heading level={3}>
                            Naam van de artiest
                        </Heading>
                    </Row>
                </Card>
            </SidebarListItem>
        )
    }
}
