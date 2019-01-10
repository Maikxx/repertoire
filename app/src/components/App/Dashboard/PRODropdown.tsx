import * as React from 'react'
import { Select } from '../../Core/DataEntry/Form/Select'

interface Props {
    name: string
}

export class PRODropdown extends React.Component<Props> {
    private roleOptions = [
        { label: 'Buma Stemra', value: 1 },
    ]

    public render() {
        const { name } = this.props

        return (
            <Select
                name={name}
                options={this.roleOptions}
                placeholder={`Select a PRO`}
            />
        )
    }
}
