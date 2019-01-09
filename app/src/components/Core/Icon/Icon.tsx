import './Icon.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { IconTypes } from './IconTypes'

export enum IconType {
    Add = 'add',
    AddCreator = 'addCreator',
    AddPublisher = 'addPublisher',
    LeftArrow = 'leftArrow',
    LogOut = 'logOut',
    Menu = 'menu',
    RegisterSong = 'registerSong',
    Check = 'check',
    DownArrow = 'downArrow',
    Close = 'close',
    Trash = 'trash',
}

interface Props {
    className?: ClassValue
    type?: IconType
}

export class Icon extends React.Component<Props> {
    private bem = new BEM('Icon', () => ({
        'is-placeholder': !this.props.type,
    }))

    public render() {
        const { className, type } = this.props

        if (!type) {
            return (
                <i className={this.bem.getClassName(className)} />
            )
        }

        return (
            <i
                className={this.bem.getClassName(className)}
                dangerouslySetInnerHTML={{
                    __html: IconTypes[type],
                }}
            />
        )
    }
}
