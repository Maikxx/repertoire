import * as React from 'react'
import { Select, SelectOption } from '../../Core/DataEntry/Form/Select'

interface Props {
    name: string
    defaultValue?: SelectOption | SelectOption[]
}

export const artistRoleDropdownOptions = [
    { label: 'Composer', value: 'composer' },
    { label: 'Singer', value: 'singer' },
    { label: 'Song writer', value: 'songWriter' },
]

export class ArtistRoleDropdown extends React.Component<Props> {
    public render() {
        const { name, defaultValue } = this.props

        return (
            <Select
                name={name}
                defaultValue={defaultValue}
                options={artistRoleDropdownOptions}
                placeholder={`Role`}
            />
        )
    }
}
