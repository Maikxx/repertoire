import './PageHeader.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'
import LogoWhiteHorizontal from '../../../../public/images/logo/rpt-logo-white-horizontal.svg'
import { Image } from '../../Core/Image/Image'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'

interface Props {
    className?: string
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        <Image
                            src={LogoWhiteHorizontal}
                            alt={`Repertoire logo`}
                        />
                    </Row>
                </Wrap>
            </header>
        )
    }
}