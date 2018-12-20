import './FieldGroup.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Row } from '../../Layout/Row/Row'
import { Column } from '../../Layout/Column/Column'

interface Props {
    className?: string
    isVertical?: boolean
    title?: string
}

export class FieldGroup extends React.Component<Props> {
    private bem = new BEM('FieldGroup', () => ({
        'has-title': !!this.props.title,
        'is-vertical': this.props.isVertical,
    }))

    public render() {
        const { className, children, title, isVertical } = this.props
        const Component = isVertical
            ? Column
            : Row

        return (
            <div className={this.bem.getClassName(className)}>
                <Component>
                    {title && (
                        <h3 className={this.bem.getElement('title')}>
                            {title}
                        </h3>
                    )}
                    <div className={this.bem.getElement('content')}>
                        {children}
                    </div>
                </Component>
            </div>
        )
    }
}
