import * as React from 'react'
import { MultiInput, MultiInputType } from '../../Core/DataEntry/MultiInput/MultiInput'
import { Select } from '../../Core/DataEntry/Form/Select'
import Query from 'react-apollo/Query'
import { Publisher } from '../../../types/Publisher'
import gql from 'graphql-tag'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { Text } from '../../Core/Text/Text/Text'

const GET_PUBLISHERS_QUERY = gql`
    query {
        getPublishers {
            _id
            name
        }
    }
`

interface QueryData {
    getPublishers: Publisher[]
}

interface Props {
    baseName: string
}

export class PublisherInput extends React.Component<Props> {
    private roleOptions = [
        {
            label: 'Licenser',
            value: 'licener',
        },
        {
            label: 'Communicator',
            value: 'communicator',
        },
    ]

    public render() {
        return (
            <Query<QueryData> query={GET_PUBLISHERS_QUERY}>
                {({ loading, data, error }) => {
                    if (loading) {
                        return <Loader />
                    }

                    if (!data || error) {
                        return this.renderNotFoundText()
                    }

                    return this.renderWithData(data)
                }}
            </Query>

        )
    }

    private renderNotFoundText = () => (
        <Text element={`span`} isSubtle={true}>
            There were no publishers found
        </Text>
    )

    private renderWithData = (data: QueryData) => {
        const { baseName } = this.props
        const options = data.getPublishers.map(publisher => ({ value: publisher._id, label: publisher.name }))

        return (
            <MultiInput type={MultiInputType.Double}>
                <Select
                    name={`${baseName}._id`}
                    options={options}
                    placeholder={`Name`}
                />
                <Select
                    name={`${baseName}.role`}
                    options={this.roleOptions}
                    placeholder={`Role`}
                />
            </MultiInput>
        )
    }
}
