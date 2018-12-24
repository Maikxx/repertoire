import './PageHeader.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Icon } from '../../Core/Icon/Icon'
import LogoutIcon from '../../../../public/images/icons/logout.svg'
import { logOut } from '../../../services/UserService'

const GET_CURRENT_USER_QUERY = gql`
    query {
        me {
            _id
            email
            name
        }
    }
`

interface CurrentUserResponse {
    me: {
        _id: string
        email: string
        name?: string
    }
}

interface Props {
    className?: string
    history: any
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className, history } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        <Query<CurrentUserResponse> query={GET_CURRENT_USER_QUERY}>
                            {({ data, loading, refetch, error }) => {
                                const contentToShow = data && data.me && (data.me.name || data.me.email)

                                return (
                                    <Button
                                        buttonStyle={ButtonStyleType.Default}
                                        className={this.bem.getElement('logout-button')}
                                        onClick={() => {
                                            logOut(history)
                                        }}
                                        type={`button`}
                                    >
                                        <Row>
                                            {contentToShow}
                                            <Icon
                                                isExtraSmall={true}
                                                src={LogoutIcon}
                                            />
                                        </Row>
                                    </Button>
                                )
                            }}
                        </Query>
                    </Row>
                </Wrap>
            </header>
        )
    }
}
