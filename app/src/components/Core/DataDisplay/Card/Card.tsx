import './Card.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import { Icon, IconType } from '../../Icon/Icon'
import { Column } from '../../Layout/Column/Column'
import { Heading } from '../../Text/Heading/Heading'
import { Text } from '../../Text/Text/Text'
import { Row } from '../../Layout/Row/Row'

interface Props {
    className?: ClassValue
    description: string
    iconType?: IconType
    onClick?: React.MouseEventHandler<HTMLDivElement>
    title: string
}

export class Card extends React.Component<Props> {
    private bem = new BEM('Card', () => ({
        'is-clickable': !!this.props.onClick,
    }))

    public render() {
        const { className, description, iconType, onClick, title } = this.props

        return (
            <div
                className={this.bem.getClassName(className)}
                onClick={onClick}
            >
                <Row>
                    {iconType && (
                        <Icon
                            className={this.bem.getElement('icon')}
                            type={iconType}
                        />
                    )}
                    <Column>
                        <Heading level={2} className={this.bem.getElement('heading')}>
                            {title}
                        </Heading>
                        <Text element={`p`} className={this.bem.getElement('description')}>
                            {description}
                        </Text>
                    </Column>
                </Row>
            </div>
        )
    }
}
