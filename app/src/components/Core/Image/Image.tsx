import './Image.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'

interface Props {
    alt?: string
    className?: ClassValue
    src: string
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
