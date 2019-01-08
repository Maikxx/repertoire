import './View.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'

interface Props {
    className?: ClassValue
    isMain?: boolean
}

export class View extends React.Component<Props> {
    private bem = new BEM('View')

    public render() {
        const { className, children, isMain } = this.props

        if (isMain) {
            return (
                <main className={this.bem.getClassName(className)}>
                    {children}
                </main>
            )
        }

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
