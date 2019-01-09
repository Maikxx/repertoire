import './CoverHeader.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { Image } from '../../Core/Image/Image'
import { Heading } from '../../Core/Text/Heading/Heading'
import Logo from '../../../../public/images/logo/rpt-logo-white-vertical.svg'

interface Props {
    className?: ClassValue
}

export class CoverHeader extends React.Component<Props> {
    private bem = new BEM('CoverHeader')

    public render() {
        const { className } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Image src={Logo}/>
                <Heading level={1}>
                    Service providers
                </Heading>
            </header>
        )
    }
}
