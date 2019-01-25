import * as React from 'react'
import { MultiInput, MultiInputType } from '../../Core/DataEntry/MultiInput/MultiInput'
import { Select, SelectOption } from '../../Core/DataEntry/Form/Select'
import { GetPublishersQuery, GetPublishersQueryResponse } from '../GraphQL/GetPublishersQuery'

export interface PublisherInputDefaultValue {
    name: SelectOption
    role: SelectOption
}

interface Props {
    baseName: string
    defaultValue?: PublisherInputDefaultValue
    disabled?: boolean
}

export const publisherInputRoleOptions = [
    {
        label: 'Communicator',
        value: 'communicator',
    },
    {
        label: 'Licenser',
        value: 'licener',
    },
]

export class PublisherInput extends React.Component<Props> {
    public render() {
        return (
            <GetPublishersQuery>
                {({ data }) => this.renderWithData(data)}
            </GetPublishersQuery>
        )
    }

    private renderWithData = (data?: GetPublishersQueryResponse) => {
        const { baseName, disabled, defaultValue } = this.props
        const options = data && data.getPublishers.map(publisher => ({ value: publisher._id, label: publisher.name }))

        return (
            <MultiInput type={MultiInputType.Double}>
                <Select
                    name={`${baseName}._id`}
                    options={options}
                    defaultValue={defaultValue && defaultValue.name}
                    disabled={disabled}
                    placeholder={`Name`}
                />
                <Select
                    name={`${baseName}.role`}
                    disabled={disabled}
                    options={publisherInputRoleOptions}
                    placeholder={`Role`}
                    defaultValue={defaultValue && defaultValue.role}
                />
            </MultiInput>
        )
    }
}
