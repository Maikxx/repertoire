import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { View } from '../../../components/Core/Layout/View/View'
import { Row } from '../../../components/Core/Layout/Row/Row'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'

interface Props {
    className?: string
}

export class InboxView extends React.Component<Props> {
    private bem = new BEM('InboxView')

    public render() {
        const { className } = this.props

        return (
            <View className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        <section>
                            Sidebar
                        </section>
                        <section>
                            Inbox
                        </section>
                    </Row>
                </Wrap>
            </View>
        )
    }
}
