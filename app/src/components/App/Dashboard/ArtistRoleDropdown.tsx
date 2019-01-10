import * as React from 'react'
import { Select } from '../../Core/DataEntry/Form/Select'

interface Props {
    name: string
}

export class ArtistRoleDropdown extends React.Component<Props> {
    private roleOptions = [
        { label: 'Composer', value: 'composer' },
        { label: 'Singer', value: 'singer' },
        { label: 'Song writer', value: 'songWriter' },
    ]

    public render() {
        const { name } = this.props

        return (
            <Select
                name={name}
                options={this.roleOptions}
                placeholder={`Role`}
            />
        )
    }
}
