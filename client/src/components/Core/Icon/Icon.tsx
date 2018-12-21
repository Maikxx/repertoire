import './Icon.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'

interface Props {
    className?: string
    isExtraSmall?: boolean
    isRound?: boolean
    isSmall?: boolean
    src?: string
}

export class Icon extends React.Component<Props> {
    private bem = new BEM('Icon', () => ({
        'is-extra-small': this.props.isExtraSmall,
        'is-small': this.props.isSmall,
        'is-round': this.props.isRound,
        'is-placeholder': !this.props.src,
    }))

    public render() {
        const { className, src } = this.props

        if (!src) {
            this.renderPlaceholder()
        }

        return (
            <img
                className={this.bem.getClassName(className)}
                src={src}
            />
        )
    }

    private renderPlaceholder = () => {
        const { className } = this.props

        return (
            <i className={this.bem.getClassName(className)} />
        )
    }
}
