import './Image.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'

interface Props {
    className?: string
    src: string
    alt?: string
}

export class Image extends React.Component<Props> {
    private bem = new BEM('Image')

    public render() {
        const { className, ...restProps } = this.props

        return (
            <img
                className={this.bem.getClassName(className)}
                {...restProps}
            />
        )
    }
}